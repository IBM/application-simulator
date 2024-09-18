package AppSim.impl.entity;

// -----( IS Java Code Template v1.2

import com.wm.data.*;
import com.wm.util.Values;
import com.wm.app.b2b.server.Service;
import com.wm.app.b2b.server.ServiceException;
// --- <<IS-START-IMPORTS>> ---
import com.wm.app.b2b.server.InvokeState;
import com.wm.app.b2b.server.ns.Namespace;
import com.wm.util.Name;
import com.wm.lang.flow.FlowElement;
import com.wm.lang.flow.FlowRoot;
import com.wm.lang.flow.FlowState;
import com.wm.lang.ns.NSName;
import com.wm.lang.ns.NSService;
import java.util.Stack;
import com.softwareag.util.IDataMap;
// --- <<IS-END-IMPORTS>> ---

public final class util

{
	// ---( internal utility methods )---

	final static util _instance = new util();

	static util _newInstance() { return new util(); }

	static util _cast(Object o) { return (util)o; }

	// ---( server methods )---




	public static final void determineDatasetName (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(determineDatasetName)>> ---
		// @sigtype java 3.5
		// [i] field:0:optional numLevelsUpInCallstack
		// [o] field:0:required datasetName
		IDataCursor pipelineCursor = pipeline.getCursor();
		try {
			
			// Number of levels to traverse up the callstack. Initially this logic was developed with
			// a fixed number of 2, hence the default. Position 0 is this Java service, position 1 from
			// where this Java service was callaed, etc.
			int numLevelsUpInCallstack = IDataUtil.getInt(pipelineCursor, "numLevelsUpInCallstack", 2);
			
			
			// Get list of all dataset names
			String[] datasetNames = null;
			try {
				IData input = null;  // To avoid deprecated warning from Service.doInvoke (null will interpreted as type Values)
				IDataMap idataAllDatasetNames = new IDataMap(Service.doInvoke(NSName.create(SVC_GET_ALL_DATASET_NAMES), input));
				datasetNames = idataAllDatasetNames.getAsStringArray(KEY_ALL_DATASET_NAMES);
			} catch (Exception e) {
				throw new ServiceException(e);
			}
			
			boolean matchFound = false;
			while (true) {
		
				debugOutput("+++++ Checking service from " + numLevelsUpInCallstack + " levels up in call stack");
				// Get all parts of the folder part of the calling service
				NSService callingSvc = getCallingService(numLevelsUpInCallstack);
				
				// Empty result means that top of call stack is already.
				// This, in turn, means that there is no more service to check
				boolean noMoreServiceToCheck = (callingSvc == null);
				
				if (noMoreServiceToCheck) {
					break;
				} else {
					Name[] folderParts = callingSvc.getNSName().getInterfacePath();
					
					// Move from last element of folder part list to first and check
					// if it matches a dataset name (case-insensitive). If so, return
					// the latter.
					for (int i = (folderParts.length - 1); i >= 0 ; i--) {
						String folderPartToCheck = folderParts[i].toString();
						debugOutput("    Folder part " + i + " : " + folderPartToCheck);
						
						String matchingString = matchingArrayMemberIgnoreCase(datasetNames, folderPartToCheck);
						if (matchingString != null) {
							matchFound = true;
							debugOutput("       => Match");
							IDataUtil.put( pipelineCursor, "datasetName", matchingString );
							break;
						}
					}
					
					// Stop, if match was found
					if (matchFound) {
						break;
					} else {
						// Otherwise, move up one position in call stack
						numLevelsUpInCallstack++;
					}
				}
			}
		} finally {
			pipelineCursor.destroy();
		}
			
			
		// --- <<IS-END>> ---

                
	}

	// --- <<IS-START-SHARED>> ---
	
	
	/**
	 * Enable (true) or disable (false) debug output
	 */
	public static final boolean ENABLE_DEBUG_OUTPUT=false;
	/**
	 * Service to invoke for getting list dataset names
	 */
	public static final String SVC_GET_ALL_DATASET_NAMES = "AppSim.impl.data.set:getDatasetNameList";
	/**
	 * Service to invoke other services 
	 */
	public static final String SVC_INVOKE = "AppSim.impl.util.system:invokeService";
	/**
	 * Output field of service defined in {@link #SVC_GET_ALL_DATASET_NAMES}
	 * where the dataset names are returned
	 */
	public static final String KEY_ALL_DATASET_NAMES = "datasetNameList";
	
	
	/**
	 * Check if string is contained in string array and ignore upper/lower case
	 * 
	 * @param array
	 *            Array to go through
	 * @param string
	 *            String to search for
	 * @return Array element that matches string (case-insensitive); NULL if no
	 *         match is found
	 */
	public static String matchingArrayMemberIgnoreCase(String[] array, String string) {
		for (int i = 0; i < array.length; i++) {
			if (array[i].toLowerCase().equals(string.toLowerCase())) {
				return array[i];
			}
		}
	    return null;
	}
	
	/**
	 * Determine from which service the call originated
	 * 
	 * @param numLevelsUpInCallstack How many levels to go up in the callstack
	 * @return
	 */
	public static NSService getCallingService(int numLevelsUpInCallstack) {
		
		// Call stack is needed to determine whether a service was called by Service.doInvoke
		@SuppressWarnings("unchecked")
		Stack<NSService> callStack = InvokeState.getCurrentState().getCallStack();
		
		// Special handling needed, in case the debugger is used
		String debuggerSessionId = InvokeState.getCurrentState().getDebuggerSessionId();
		if (debuggerSessionId != null && !isCallfromServiceDoInvoke(callStack)) {
			printCallStack();
			return getCallingServiceDebugMode(numLevelsUpInCallstack);
		}
		
		// Below is the logic for normal execution (i.e. no debugger used) 
		NSService currentSvc = Service.getServiceEntry();
		
		int index = callStack.indexOf(currentSvc);
		if (index > 0) {
			return (NSService) callStack.elementAt(index - numLevelsUpInCallstack);
		}
		return null;
	}
	
	/**
	 * Determine whether service was invoked in debugger and using {@value #SVC_INVOKE}
	 * 
	 * @param callStack
	 * @return
	 */
	private static boolean isCallfromServiceDoInvoke(Stack<NSService> callStack) {
		return callStack.get(1).toString().equals(SVC_INVOKE);
	}
	
	/**
	 * Print the call stack to STDOUT
	 * 
	 * @param callStack
	 */
	private static void printCallStack() {
		@SuppressWarnings("unchecked")
		Stack<NSService> callStack = InvokeState.getCurrentState().getCallStack();
		debugOutput("=========================================== Call stack");
		for (NSService nsService : callStack) {
			debugOutput("  " + nsService.toString());
		}
	}
	
	/**
	 * Get calling service name when in debug mode
	 * 
	 * @param numLevelsUpInCallstack How many levels to go up in the callstack
	 * @return
	 */
	private static NSService getCallingServiceDebugMode(int numLevelsUpInCallstack) {
		
		FlowState flowState = InvokeState.getCurrentState().getFlowState();
		printCallStackDebugMode(flowState);
		
		if (flowState != null) {
			
			// Traverse up the callstack as often as needed
			// The value of flowState already points to the calling service,
			// therefore the number of iterations needs to be reduced by 1.
			for (int i = 0; i < (numLevelsUpInCallstack - 1); i++) {
				flowState = flowState.getParent();
				if (flowState == null) {
					return null;
				}
			}
			return getServiceFromFlowstate(flowState);
		}
		return null;
	}
	
	/**
	 * Print the debugger's call stack to STDOUT
	 * 
	 * @param flowState
	 */
	private static void printCallStackDebugMode(FlowState flowState) {
		debugOutput("=========================================== Call stack in debug mode");
		debugOutput("  " + getServiceFromFlowstate(flowState).toString());
		while (true) {
			flowState = flowState.getParent();
			if (flowState == null) {
				return;
			}
			debugOutput("  " + getServiceFromFlowstate(flowState).toString());
		}
	}
	
	/**
	 * Determine service name from FlowState
	 * 
	 * @param flowState FlowState for which to return NSService
	 * @return NSService for FlowState; may be null
	 */
	private static NSService getServiceFromFlowstate(FlowState flowState) {
		FlowElement flowElement = flowState.current();
		if (flowElement != null) {
			FlowElement flowRoot = flowElement.getFlowRoot();
			if ((flowRoot != null) && ((flowRoot instanceof FlowRoot))) {
				String serviceName = flowRoot.getNSName();
				NSService service = (NSService) Namespace.current().getNode(serviceName);
				return service;
			}
		}
		return null;
	}
	
	/**
	 * Print to STDOUT if {@link #ENABLE_DEBUG_OUTPUT} is set to true
	 * 
	 * @param output String to print
	 */
	public static void debugOutput(String output) {
		if (ENABLE_DEBUG_OUTPUT) {
			System.out.println(output);
		}
	}
	
		
		
		
	// --- <<IS-END-SHARED>> ---
}

