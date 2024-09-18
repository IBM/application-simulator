package AppSim.impl.helper;

// -----( IS Java Code Template v1.2

import com.wm.data.*;
import com.wm.util.Values;
import com.wm.app.b2b.server.Service;
import com.wm.app.b2b.server.ServiceException;
// --- <<IS-START-IMPORTS>> ---
import java.util.List;
import net.sf.ehcache.Cache;
import wm.server.ehcache.CacheServiceUtils;
import com.softwareag.wx.is.config.Access;
import com.softwareag.wx.is.config.WxConfig;
// --- <<IS-END-IMPORTS>> ---

public final class cache

{
	// ---( internal utility methods )---

	final static cache _instance = new cache();

	static cache _newInstance() { return new cache(); }

	static cache _cast(Object o) { return (cache)o; }

	// ---( server methods )---




	public static final void getKeysWithPagination (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(getKeysWithPagination)>> ---
		// @sigtype java 3.5
		// [i] field:0:required cacheName
		// [i] field:0:optional offset
		// [i] field:0:optional limit
		// [o] field:1:required keysAsString
		// [o] field:0:required capacity
		IDataCursor idc = pipeline.getCursor();
		try { 
			// Get calling parameters
			String cacheName = IDataUtil.getString(idc, "cacheName");
			int offset = IDataUtil.getInt(idc, "offset", noValueSpecified);
			int limit = IDataUtil.getInt(idc, "limit", noValueSpecified);
			 
			
			// Only use pagination if offset and limit are specified
			boolean usePagination = (offset != noValueSpecified && limit != noValueSpecified);
			
			// Get keys
			Cache cache = CacheServiceUtils.getCache(cacheManagerName, cacheName);
			List<Object> keys = cache.getKeys();
			
			if (usePagination) {
			
				// Limit bigger than what is in cache?
				int maxIndexFromOffsetAndLimit = offset + limit;
				if (keys.size() < maxIndexFromOffsetAndLimit) {
					limit = keys.size() - offset + 1;
				}
				
			} else {
				offset = 1;
				limit = keys.size();
			}
			
			
			// Get effective keys
			String[] keysOut = null;
			if (limit > 0) {
				keysOut = new String[limit];
				for (int i = 0; i < limit; i++) {
					keysOut[i] = (String) keys.get(offset + i - 1);
				}
			}
		
			
			// Return data
			IDataUtil.put(idc, "keysAsString", keysOut);
			IDataUtil.put(idc, "capacity", "" + keys.size());
			
		} finally {
			idc.destroy();
		}
			
			
			
			
			
		// --- <<IS-END>> ---

                
	}



	public static final void sizeOf (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(sizeOf)>> ---
		// @sigtype java 3.5
		// [i] field:0:required cacheName
		// [o] field:0:required capacity
		IDataCursor idc = pipeline.getCursor();
		try {
			// Get calling parameters
			String cacheName = IDataUtil.getString(idc, "cacheName");
			
			
			// Get keys
			Cache cache = CacheServiceUtils.getCache(cacheManagerName, cacheName);
			List<Object> keys = cache.getKeys();
			
			// Return data
			IDataUtil.put(idc, "capacity", "" + keys.size());
		} finally {
			idc.destroy();
		}
			
			
			
		// --- <<IS-END>> ---

                
	}

	// --- <<IS-START-SHARED>> ---
	public static final String cacheManagerName = "AppSim";
	public static final int noValueSpecified = -1;
		
		
		
	// --- <<IS-END-SHARED>> ---
}

