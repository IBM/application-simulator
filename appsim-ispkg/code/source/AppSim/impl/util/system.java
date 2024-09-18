package AppSim.impl.util;

// -----( IS Java Code Template v1.2

import com.wm.data.*;
import com.wm.util.Values;
import com.wm.app.b2b.server.Service;
import com.wm.app.b2b.server.ServiceException;
// --- <<IS-START-IMPORTS>> ---
import com.wm.app.b2b.server.ns.Namespace;
import com.wm.lang.ns.NSName;
import com.wm.lang.ns.NSNode;
import com.wm.lang.ns.NSService;
import com.wm.lang.ns.NSType;
// --- <<IS-END-IMPORTS>> ---

public final class system

{
	// ---( internal utility methods )---

	final static system _instance = new system();

	static system _newInstance() { return new system(); }

	static system _cast(Object o) { return (system)o; }

	// ---( server methods )---




	public static final void existsService (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(existsService)>> ---
		// @sigtype java 3.5
		// [i] field:0:required serviceName
		// [o] field:0:required existsService
		// pipeline
		
		
		IDataCursor pipelineCursor = pipeline.getCursor();
		try {
			String	serviceName = IDataUtil.getString( pipelineCursor, "serviceName" );
			
			// Default return value is false
			boolean existsService = false;
			
			// Change return value if node exists and is of type service
			NSNode node = Namespace.current().getNode(serviceName);
			if (node != null) {
				NSType type = node.getNodeTypeObj();
				if (type.equals(NSService.TYPE)) {
					existsService = true;
				}
			}
			
			IDataUtil.put( pipelineCursor, "existsService", "" + existsService );
		} finally {
			pipelineCursor.destroy();
		}
		
		
		
		
			
		// --- <<IS-END>> ---

                
	}



	public static final void invokeService (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(invokeService)>> ---
		// @sigtype java 3.5
		// [i] field:0:required serviceName
		// [i] record:0:optional serviceInput
		// [o] record:0:optional serviceOutput
		// pipeline
		IDataCursor pipelineCursor = pipeline.getCursor();
			String	serviceName = IDataUtil.getString( pipelineCursor, "serviceName" );
			IData serviceInput = IDataUtil.getIData(pipelineCursor, "serviceInput");
		pipelineCursor.destroy();
		
		IData serviceOutput;
		try {
			serviceOutput = Service.doInvoke(NSName.create(serviceName), serviceInput);
		} catch (Exception e) {
			throw new ServiceException(e);
		}
		
		// pipeline
		IDataCursor pipelineCursor_1 = pipeline.getCursor();
		IDataUtil.put( pipelineCursor_1, "serviceOutput", serviceOutput );
		pipelineCursor_1.destroy();
			
		// --- <<IS-END>> ---

                
	}



	public static final void sleep (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(sleep)>> ---
		// @sigtype java 3.5
		// [i] field:0:required milliseconds

  IDataCursor pipelineCursor = pipeline.getCursor();
  long milliseconds = IDataUtil.getLong(pipelineCursor, "milliseconds", -1L);
  pipelineCursor.destroy();
  if (milliseconds != -1L) {
     try {
        Thread.sleep(milliseconds);
     } catch (InterruptedException var5) {
        var5.printStackTrace();
     }
  }
	
		// --- <<IS-END>> ---

                
	}
}

