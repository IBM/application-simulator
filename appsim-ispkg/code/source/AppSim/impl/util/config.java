package AppSim.impl.util;

// -----( IS Java Code Template v1.2

import com.wm.data.*;
import com.wm.util.Values;
import com.wm.app.b2b.server.Service;
import com.wm.app.b2b.server.ServiceException;
// --- <<IS-START-IMPORTS>> ---
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Hashtable;
import java.util.Properties;
// --- <<IS-END-IMPORTS>> ---

public final class config

{
	// ---( internal utility methods )---

	final static config _instance = new config();

	static config _newInstance() { return new config(); }

	static config _cast(Object o) { return (config)o; }

	// ---( server methods )---




	public static final void getConfigFromProperties (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(getConfigFromProperties)>> ---
		// @sigtype java 3.5
		// [i] field:0:required configType
		// [o] object:0:required hashtable
		// pipeline
		IDataCursor pipelineCursor = pipeline.getCursor();
		String	config = IDataUtil.getString( pipelineCursor, "configType" );
		pipelineCursor.destroy();
		Properties prop = new Properties();
		Properties props = System.getProperties();
		String osName = props.getProperty("os.name").toLowerCase();
		String message = "",osType="";
		if(osName.contains("win"))
		{
		osType="windows";	
		}	
		else{
			osType="linux";
		}
		String fileName = "./packages/AppSim/config/"+config+".cnf";
		//String fileName = props.getProperty("watt.server.homeDir") +"\\packages\\AppSim\\config\\"+config+".cnf";
		 Hashtable<String, String> hashtable = new Hashtable<>();
		 FileInputStream fis =null;
		 String[] valueList = null;
		 int i =0;
		
		// pipeline
		IDataCursor pipelineCursor_1 = pipeline.getCursor();
		try {
			
			fis = new FileInputStream(fileName);
			prop.load(fis);
			valueList = new String[16];
			for (Object key: prop.keySet()) {
				
				hashtable.put(key.toString(), prop.getProperty(key.toString()));
		    }
			 if(config.contains("generic-config"))
			 {
				 hashtable.put("appsim.dataset.directory", prop.getProperty("appsim.dataset.directory."+osType));
			 }
		   
		} catch (IOException ex) {
		   message= ex.getMessage();
		} 
		finally{
			 try {
				fis.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		IDataUtil.put( pipelineCursor_1, "hashtable", hashtable );
			pipelineCursor_1.destroy();
		// --- <<IS-END>> ---

                
	}



	public static final void updatePasswdFromEnv (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(updatePasswdFromEnv)>> ---
		// @sigtype java 3.5
		String defaultPwd, adminPwd = "";
		defaultPwd = System.getenv("APPSIM_DEFAULT_PWD");
		adminPwd = System.getenv("APPSIM_ADMIN_PWD");
		FileInputStream fis =null;
		FileOutputStream fout = null;
		Properties prop = new Properties();
		Boolean isUpdated = false;
		String fileName = "./packages/AppSim/config/access-config.cnf";
		try {
			fis = new FileInputStream(fileName);
			prop.load(fis);
			fis.close();
			if(defaultPwd !="" && defaultPwd !=null){
				prop.setProperty("appsim.users.default_asuser.pwd", defaultPwd);
				isUpdated = true;
			}
			if(adminPwd !="" && adminPwd !=null){
				prop.setProperty("appsim.users.admin_asuser.pwd", adminPwd);
				isUpdated = true;
			}
			if(isUpdated == true){
			fout = new FileOutputStream(fileName);
			prop.store(fout, "AppSim Access Config");
			fout.close();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// --- <<IS-END>> ---

                
	}
}

