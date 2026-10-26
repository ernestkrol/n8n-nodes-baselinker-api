import {
	IDataObject,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	IPollFunctions,
} from 'n8n-workflow';
import { baselinkerApiRequest, sleep } from './GenericFunctions';
import { IBaseLinkerStatus } from './OrderStatus/OrderStatusInterface';

export const ALL_BASELINKER_LOG_TYPES = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
];

export class BaseLinkerTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BaseLinker Trigger',
		name: 'baseLinkerTrigger',
		icon: 'file:baselinker.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Starts the workflow on BaseLinker order events (polling getJournalList)',
		defaults: {
			name: 'BaseLinker Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'baseLinkerApi',
				required: true,
			},
		],
		polling: true,
		properties: [
			{
				displayName: 'What to Poll',
				name: 'event',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'All Events (All 22 Event Types)',
						value: 'all',
						description: 'Poll all order event types in BaseLinker (creation, statuses, payments, packages, invoices)',
					},
					{
						name: 'Order Created',
						value: 'orderCreated',
						description: 'Trigger when a new order is created in BaseLinker (log_type: 1)',
					},
					{
						name: 'Order Status Changed',
						value: 'orderStatusChanged',
						description: 'Trigger when an order status changes (log_type: 18)',
					},
					{
						name: 'Order Paid',
						value: 'orderPaid',
						description: 'Trigger when payment for an order is registered (log_type: 3)',
					},
					{
						name: 'Courier Package Created',
						value: 'packageCreated',
						description: 'Trigger when a shipping label/consignment is created (log_type: 9)',
					},
					{
						name: 'Courier Package Status Changed',
						value: 'packageStatusChanged',
						description: 'Trigger when shipment tracking status changes (log_type: 22)',
					},
					{
						name: 'Invoice Issued',
						value: 'invoiceIssued',
						description: 'Trigger when an invoice is issued for an order (log_type: 7)',
					},
					{
						name: 'Specific Event Types (Custom)',
						value: 'custom',
						description: 'Select one or more specific BaseLinker event log types',
					},
				],
				default: 'orderCreated',
				description: 'Choose which BaseLinker events to poll for',
			},
			{
				displayName: 'Target Status Filter',
				name: 'statusId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getOrderStatuses',
				},
				displayOptions: {
					show: {
						event: ['orderStatusChanged'],
					},
				},
				default: '',
				description: 'Optionally trigger only when orders transition into this specific status. Choose from the list, or specify an ID using an expression. Leave empty to trigger on any status change.',
			},
			{
				displayName: 'Event Types',
				name: 'customLogsTypes',
				type: 'multiOptions',
				displayOptions: {
					show: {
						event: ['custom'],
					},
				},
				options: [
					{ name: '1 - Order Creation', value: 1 },
					{ name: '2 - DOF Download (Order Confirmation)', value: 2 },
					{ name: '3 - Payment of Order', value: 3 },
					{ name: '4 - Removal of Order / Invoice / Receipt', value: 4 },
					{ name: '5 - Merging Orders', value: 5 },
					{ name: '6 - Splitting Order', value: 6 },
					{ name: '7 - Issuing Invoice', value: 7 },
					{ name: '8 - Issuing Receipt', value: 8 },
					{ name: '9 - Package Creation', value: 9 },
					{ name: '10 - Deleting Package', value: 10 },
					{ name: '11 - Editing Delivery Data', value: 11 },
					{ name: '12 - Adding Product to Order', value: 12 },
					{ name: '13 - Editing Product in Order', value: 13 },
					{ name: '14 - Removing Product from Order', value: 14 },
					{ name: '15 - Adding Buyer to Blacklist', value: 15 },
					{ name: '16 - Editing Order Data', value: 16 },
					{ name: '17 - Copying Order', value: 17 },
					{ name: '18 - Order Status Change', value: 18 },
					{ name: '19 - Invoice Deletion', value: 19 },
					{ name: '20 - Receipt Deletion', value: 20 },
					{ name: '21 - Editing Invoice Data', value: 21 },
					{ name: '22 - Package Status Change', value: 22 },
				],
				default: [1],
				required: true,
				description: 'Select which BaseLinker event types should trigger the workflow',
			},
			{
				displayName: 'Order ID Filter',
				name: 'orderId',
				type: 'number',
				default: '',
				placeholder: 'e.g. 7834521',
				description: 'Optionally restrict events to a single specific Order ID. Leave empty to poll across all orders.',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Fetch Full Order Details',
						name: 'resolveOrderDetails',
						type: 'boolean',
						default: false,
						description: 'Whether to automatically fetch and attach complete order details (buyer, addresses, products, totals) for each triggered order event',
					},
					{
						displayName: 'Initial Run Behavior',
						name: 'initialRun',
						type: 'options',
						options: [
							{
								name: 'Fetch Only New Events After Activation',
								value: 'latest',
								description: 'Initializes the cursor to current state without triggering on historical events from the last 3 days (recommended)',
							},
							{
								name: 'Fetch All Existing Events from Last 3 Days',
								value: 'allRecent',
								description: 'Triggers immediately on all available events recorded in BaseLinker over the past 3 days',
							},
						],
						default: 'latest',
						description: 'How to handle the very first polling execution when the workflow is activated',
					},
					{
						displayName: 'Start From Log ID',
						name: 'startLogId',
						type: 'number',
						default: '',
						placeholder: 'e.g. 12345678',
						description: 'Optionally specify a starting Log ID cursor (> 0). If provided and no cursor has been saved yet, polling starts after this log ID.',
					},
				],
			},
		],
	};

	methods = {
		loadOptions: {
			async getOrderStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getOrderStatusList', {});
				const statuses: IBaseLinkerStatus[] = response.statuses || [];
				return statuses.map((status) => ({
					name: `${status.name} (ID: ${status.id})`,
					value: status.id,
					description: `Customer name: ${status.name_for_customer || status.name}, Group: ${status.group_id}`,
				}));
			},
		},
	};

	async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
		const workflowStaticData = this.getWorkflowStaticData('node');
		const isManualMode = this.getMode() === 'manual';
		const event = this.getNodeParameter('event', 'orderCreated') as string;
		const rawOrderId = this.getNodeParameter('orderId', undefined);
		const options = this.getNodeParameter('options', {}) as IDataObject;
		const resolveOrderDetails = (options.resolveOrderDetails as boolean) || false;
		const initialRun = (options.initialRun as string) || 'latest';
		const startLogId =
			options.startLogId !== undefined && options.startLogId !== '' && !isNaN(Number(options.startLogId))
				? Number(options.startLogId)
				: undefined;

		let logsTypes: number[] = [];
		if (event === 'all') {
			logsTypes = ALL_BASELINKER_LOG_TYPES;
		} else if (event === 'orderCreated') {
			logsTypes = [1];
		} else if (event === 'orderStatusChanged') {
			logsTypes = [18];
		} else if (event === 'orderPaid') {
			logsTypes = [3];
		} else if (event === 'packageCreated') {
			logsTypes = [9];
		} else if (event === 'packageStatusChanged') {
			logsTypes = [22];
		} else if (event === 'invoiceIssued') {
			logsTypes = [7];
		} else if (event === 'custom') {
			const custom = this.getNodeParameter('customLogsTypes', []) as number[];
			logsTypes = custom.length > 0 ? custom : ALL_BASELINKER_LOG_TYPES;
		} else {
			logsTypes = ALL_BASELINKER_LOG_TYPES;
		}

		const journalParams: IDataObject = {
			logs_types: logsTypes,
		};

		if (rawOrderId !== undefined && rawOrderId !== '' && !isNaN(Number(rawOrderId)) && Number(rawOrderId) > 0) {
			journalParams.order_id = Number(rawOrderId);
		}

		const currentLastLogId = workflowStaticData.lastLogId as number | undefined;

		// Handle first run when cursor is not yet initialized
		if (currentLastLogId === undefined) {
			if (startLogId !== undefined && startLogId > 0) {
				journalParams.last_log_id = startLogId;
				workflowStaticData.lastLogId = startLogId;
			} else if (initialRun === 'latest') {
				// Query recent logs without last_log_id to determine current latest event cursor
				const initResponse = await baselinkerApiRequest.call(this, 'getJournalList', journalParams);
				const initLogs = (initResponse.logs || []) as IDataObject[];
				if (initLogs.length > 0) {
					let maxId = 0;
					for (const log of initLogs) {
						const id = Number(log.id ?? log.log_id);
						if (!isNaN(id) && id > maxId) {
							maxId = id;
						}
					}
					workflowStaticData.lastLogId = maxId;

					// In manual mode (canvas testing), return the single latest log as sample data so the user
					// can map fields in downstream nodes, while setting the cursor to prevent duplicate triggers
					if (isManualMode) {
						const latestLog = initLogs.find((l) => Number(l.id ?? l.log_id) === maxId);
						if (latestLog) {
							const returnData: INodeExecutionData[] = [];
							if (resolveOrderDetails) {
								const orderLogId = Number(latestLog.order_id);
								let orderData: IDataObject = {};
								if (orderLogId) {
									try {
										const orderRes = await baselinkerApiRequest.call(this, 'getOrders', { order_id: orderLogId });
										const orders = (orderRes.orders || []) as IDataObject[];
										if (orders.length > 0) {
											orderData = orders[0];
										}
									} catch (err: any) {
										orderData = { _resolveError: err.message || String(err) };
									}
								}
								returnData.push({ json: { ...latestLog, order: orderData } });
							} else {
								returnData.push({ json: latestLog });
							}
							return [returnData];
						}
					}
				} else {
					workflowStaticData.lastLogId = 0;
				}
				// In production mode, do not emit historical backlog on cold start
				return null;
			}
			// If initialRun === 'allRecent': do not set last_log_id (BaseLinker will return all available 3-day logs)
		} else if (currentLastLogId > 0) {
			// BaseLinker requires last_log_id to be strictly greater than 0 if passed
			journalParams.last_log_id = currentLastLogId;
		} else if (startLogId !== undefined && startLogId > 0) {
			journalParams.last_log_id = startLogId;
		}
		// Note: We deliberately do NOT set last_log_id: 0 because BaseLinker returns:
		// "last_log_id should be greater than zero"

		const response = await baselinkerApiRequest.call(this, 'getJournalList', journalParams);
		const rawLogs = (response.logs || []) as IDataObject[];

		if (rawLogs.length === 0) {
			return null;
		}

		// BaseLinker's getJournalList uses last_log_id inclusively (>= last_log_id).
		// We MUST strictly filter out any events with id <= cursorThreshold to avoid re-emitting duplicates!
		const cursorThreshold =
			currentLastLogId !== undefined && currentLastLogId > 0
				? currentLastLogId
				: startLogId !== undefined && startLogId > 0
				? startLogId
				: undefined;

		let logsToProcess = rawLogs;
		if (cursorThreshold !== undefined) {
			logsToProcess = logsToProcess.filter((log) => {
				const id = Number(log.id ?? log.log_id);
				return !isNaN(id) && id > cursorThreshold;
			});
		} else if (isManualMode && currentLastLogId === undefined && initialRun === 'allRecent') {
			logsToProcess = rawLogs.slice(-10);
		}

		if (event === 'orderStatusChanged') {
			const targetStatusId = this.getNodeParameter('statusId', '') as string | number;
			if (targetStatusId !== '' && targetStatusId !== undefined && targetStatusId !== null) {
				const numericStatusId = Number(targetStatusId);
				logsToProcess = logsToProcess.filter((log) => Number(log.object_id) === numericStatusId);
			}
		}

		// Always advance cursor to highest seen ID
		let maxId = cursorThreshold || 0;
		for (const log of rawLogs) {
			const id = Number(log.id ?? log.log_id);
			if (!isNaN(id) && id > maxId) {
				maxId = id;
			}
		}
		if (maxId > 0) {
			workflowStaticData.lastLogId = maxId;
		}

		if (logsToProcess.length === 0) {
			return null;
		}

		const returnData: INodeExecutionData[] = [];

		if (resolveOrderDetails) {
			for (let idx = 0; idx < logsToProcess.length; idx++) {
				const log = logsToProcess[idx];
				const orderLogId = Number(log.order_id);
				let orderData: IDataObject = {};
				if (orderLogId) {
					try {
						const orderRes = await baselinkerApiRequest.call(this, 'getOrders', { order_id: orderLogId });
						const orders = (orderRes.orders || []) as IDataObject[];
						if (orders.length > 0) {
							orderData = orders[0];
						}
					} catch (err: any) {
						orderData = { _resolveError: err.message || String(err) };
					}
					if (idx < logsToProcess.length - 1) {
						await sleep(300);
					}
				}

				returnData.push({
					json: {
						...log,
						order: orderData,
					},
				});
			}
		} else {
			for (const log of logsToProcess) {
				returnData.push({
					json: log,
				});
			}
		}

		return [returnData];
	}
}
