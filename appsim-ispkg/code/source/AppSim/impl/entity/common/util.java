package AppSim.impl.entity.common;

// -----( IS Java Code Template v1.2

import com.wm.data.*;
import com.wm.util.Values;
import com.wm.app.b2b.server.Service;
import com.wm.app.b2b.server.ServiceException;
// --- <<IS-START-IMPORTS>> ---
// --- <<IS-END-IMPORTS>> ---

public final class util

{
	// ---( internal utility methods )---

	final static util _instance = new util();

	static util _newInstance() { return new util(); }

	static util _cast(Object o) { return (util)o; }

	// ---( server methods )---




	public static final void getEntityNameFromDatasetName (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(getEntityNameFromDatasetName)>> ---
		// @sigtype java 3.5
		// [i] field:0:required datasetName
		// [o] field:0:required entityName
		IDataCursor pipelineCursor = pipeline.getCursor();
		try {
			String	datasetName = IDataUtil.getString( pipelineCursor, "datasetName" );
		
			IDataUtil.put( pipelineCursor, "entityName", Character.toLowerCase(datasetName.charAt(0)) + datasetName.substring(1) );
		} finally {
			pipelineCursor.destroy();
		}
			
			
		// --- <<IS-END>> ---

                
	}
}

