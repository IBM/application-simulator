package AppSim.impl.entity.common.processing.retrieve;

// -----( IS Java Code Template v1.2

import com.wm.data.*;
import com.wm.util.Values;
import com.wm.app.b2b.server.Service;
import com.wm.app.b2b.server.ServiceException;
// --- <<IS-START-IMPORTS>> ---
import com.wm.lang.ns.NSService;
import com.softwareag.util.IDataMap;
import AppSim.impl.entity.util;
// --- <<IS-END-IMPORTS>> ---

public final class resolveIds

{
	// ---( internal utility methods )---

	final static resolveIds _instance = new resolveIds();

	static resolveIds _newInstance() { return new resolveIds(); }

	static resolveIds _cast(Object o) { return (resolveIds)o; }

	// ---( server methods )---




	public static final void removeDatasetNameIfCalledFromResolveIds (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(removeDatasetNameIfCalledFromResolveIds)>> ---
		// @sigtype java 3.5
		// [i] recref:0:optional control AppSim.impl.entity.control:Control
		// [o] recref:0:optional control AppSim.impl.entity.control:Control
		for (int i = 0; i < 2; i++) {
			NSService callingService = AppSim.impl.entity.util.getCallingService(1 + i);
			System.out.println(callingService);
		}
		NSService callingService = AppSim.impl.entity.util.getCallingService(3);
		System.out.println(callingService);
		System.out.println("===================================================================");
		boolean isCalledFromResolveIds = callingService.toString().contains("resolveIds");
		System.out.println(isCalledFromResolveIds);
		if (isCalledFromResolveIds) {
			IDataMap idm = new IDataMap(pipeline);
			IData control = idm.getAsIData("control");
			IDataCursor idc = control.getCursor();
			IDataUtil.remove(idc, "datasetName");
			idc.destroy();
		}
		// --- <<IS-END>> ---

                
	}
}

