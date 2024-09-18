package AppSim.impl.util;

// -----( IS Java Code Template v1.2

import com.wm.data.*;
import com.wm.util.Values;
import com.wm.app.b2b.server.Service;
import com.wm.app.b2b.server.ServiceException;
// --- <<IS-START-IMPORTS>> ---
import java.security.SecureRandom;
// --- <<IS-END-IMPORTS>> ---

public final class security

{
	// ---( internal utility methods )---

	final static security _instance = new security();

	static security _newInstance() { return new security(); }

	static security _cast(Object o) { return (security)o; }

	// ---( server methods )---




	public static final void generateRandomString (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(generateRandomString)>> ---
		// @sigtype java 3.5
		// [i] field:0:required length
		// [o] field:0:required output
		// pipeline
		IDataCursor pipelineCursor = pipeline.getCursor();
			String	length = IDataUtil.getString( pipelineCursor, "length" );
		pipelineCursor.destroy();
		 int len = Integer.parseInt(length);
		final String chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		 
		
		SecureRandom random = new SecureRandom();
		StringBuilder sb = new StringBuilder();
		 
		// each iteration of the loop randomly chooses a character from the given
		// ASCII range and appends it to the `StringBuilder` instance
		 
		for (int i = 0; i < len; i++)
		{
		    int randomIndex = random.nextInt(chars.length());
		    sb.append(chars.charAt(randomIndex));
		}
		
		
		// pipeline
		IDataCursor pipelineCursor_1 = pipeline.getCursor();
		IDataUtil.put( pipelineCursor_1, "output", sb.toString() );
		pipelineCursor_1.destroy();
		
		 
		// --- <<IS-END>> ---

                
	}
}

