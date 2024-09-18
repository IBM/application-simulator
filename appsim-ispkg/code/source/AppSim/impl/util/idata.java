package AppSim.impl.util;

// -----( IS Java Code Template v1.2

import com.wm.data.*;
import com.wm.util.Values;
import com.wm.app.b2b.server.Service;
import com.wm.app.b2b.server.ServiceException;
// --- <<IS-START-IMPORTS>> ---
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
// --- <<IS-END-IMPORTS>> ---

public final class idata

{
	// ---( internal utility methods )---

	final static idata _instance = new idata();

	static idata _newInstance() { return new idata(); }

	static idata _cast(Object o) { return (idata)o; }

	// ---( server methods )---




	public static final void get (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(get)>> ---
		// @sigtype java 3.5
		// [i] record:0:optional document
		// [i] field:0:required path
		// [i] field:0:optional usePipeline {"true","false"}
		// [o] object:0:required value
		// [o] record:1:optional documentList
		IDataCursor pipelineCursor = pipeline.getCursor();
		try {
			
		
			IData document = IDataUtil.getIData(pipelineCursor, "document");
			String path = IDataUtil.getString(pipelineCursor, "path");
			Boolean usePipeline = IDataUtil.getBoolean(pipelineCursor, "usePipeline", false);
		
			Object value = null;
			if (usePipeline) {
				document = pipeline;
				value = IDataUtilExt.get(pipeline, path);
			
			} else {
				value = IDataUtilExt.get(document, path);
			}
		
			if (value instanceof IData[]) {
				IDataUtil.put(pipelineCursor, "documentList", value);
			}
			
			IDataUtil.put(pipelineCursor, "value", value);
		} finally {
			pipelineCursor.destroy();
		}
			
			
			
		// --- <<IS-END>> ---

                
	}

	// --- <<IS-START-SHARED>> ---
	public static class IDataUtilExt {
	
		/**
		 * Data types for conversion. See
		 * {@link IDataUtilExt#put(IData, String, Object, DataType)} for usage
		 */
		public enum DataType {
			DEFAULT, STRING_LIST, DOCUMENT_LIST
		}
	
		/**
		 * Return value from pipeline as {@link Integer}. Similar to
		 * {@link IDataUtil#getInt(IDataCursor, String, int)} but allows for NULL as
		 * default value.
		 * 
		 * @param pipelineCursor
		 * @param key
		 * @param defaultValue
		 * @return
		 */
		public static Integer getInt(IDataCursor pipelineCursor, String key, Integer defaultValue) {
			Integer out = null;
			String valueStr = IDataUtil.getString(pipelineCursor, key);
			if (valueStr != null) {
				out = Integer.parseInt(valueStr);
			} else {
				out = defaultValue;
			}
			return out;
		}
		
		/**
		 * Get a value from a nested IData. If not found, or if any intermediate
		 * IData's are not found, will return null.
		 * Taken from WxIData (https://labcase.softwareag.com/projects/wxidata/wiki)
		 *
		 * @param idata
		 *            IData from which to extract
		 * @param path
		 *            Path to use for extraction
		 * @return result of extraction
		 */
		public static Object get(IData idata, String path) {
			if ((idata == null) || (path == null) || path.isEmpty()) {
				return null;
			}
			IDataCursor cursor = idata.getCursor();
			path = path.replaceFirst("^/+", "");
			int indexOfSeparator = path.indexOf("/");
			if (indexOfSeparator != -1) {
				String name = path.substring(0, indexOfSeparator);
				IData node = (IData) IDataUtil.get(cursor, name);
				return get(node, path.substring(indexOfSeparator, path.length()));
			} else {
				Object returnObj = IDataUtil.get(cursor, path);
				// Perform Deep-Clone if obj is an IData
				if (returnObj instanceof IData) {
					try {
						returnObj = IDataUtil.deepClone((IData) returnObj);
					} catch (IOException e) {
						// TODO: Why would an IOException occur ?
					}
	
				} // else if (returnObj instanceof Cloneable) {
					// returnObj = returnObj.clone();
					// }
				return returnObj;
			}
		}
		
		/**
		 * Put a value into a nested IData, instantiating any null IData's along the
		 * way. Taken from WxIData
		 * (https://labcase.softwareag.com/projects/wxidata/wiki)
		 * 
		 * @param idata
		 *            Target IData
		 * @param path
		 *            Path inside target
		 * @param value
		 *            Value to place
		 * @param dataType
		 *            Data type to convert value to optionally. Ensures that arrays
		 *            of length 1 are not silently converted to the non-array data
		 *            type
		 * @return processed IData
		 */
		public static IData put(IData idata, String path, Object value, DataType dataType) {
			if (path == null || path.isEmpty()) {
				return idata;
			}
			if (idata == null) {
				idata = IDataFactory.create();
			}
			if (dataType == null) {
				dataType = DataType.DEFAULT;
			}
			
			IDataCursor cursor = idata.getCursor();
			path = path.replaceFirst("^/+", ""); // Remove any leading /'s
			int indexOfSeparator = path.indexOf("/"); // Get index of next /
	
			// If there are still more levels in the remaining path
			// (indicated by the existence of at least one more separator)
			if (indexOfSeparator != -1) {
	
				// Get the name of the next path part
				String name = path.substring(0, indexOfSeparator);
				IData node = null;
	
				// Get the IData corresponding to this part
				// Or create if it doesn't already exist
				node = (IData) IDataUtil.get(cursor, name);
				if (node == null) {
					node = IDataFactory.create();
					IDataUtil.put(cursor, name, node);
				}
	
				// Recurse through function again for the remaining subtree
				put(node, path.substring(indexOfSeparator, path.length()), value, dataType);
	
				// No more path parts, we are at the "leaf" of the path
				// So put the actual value here
			} else {
				switch (dataType) {
				case STRING_LIST:
					if (value instanceof String) {
						value = new String[] { (String) value };
					}
					IDataUtil.put(cursor, path, value);
					break;
					
				case DOCUMENT_LIST:
					if (value instanceof IData) {
						value = new IData[] { (IData) value };
					}
					IDataUtil.put(cursor, path, value);
					break;
	
				default:
					IDataUtil.put(cursor, path, value);
					break;
				}
	
			}
			return idata;
		}
	
		
		/**
		 * Remove all NULL fields from {@link IData}
		 * 
		 * @param data
		 *            IData to process
		 * @return IData without NULL fields
		 */
		public static IData removeNullValuesRecursively(IData data) {
			IDataCursor idc = data.getCursor();
			boolean hasNext = idc.first();
			while (hasNext) {
				Object element = idc.getValue();
				if (element == null) {
					hasNext = idc.delete();
				} else if (element instanceof IData) {
					removeNullValuesRecursively((IData) element);
					hasNext = idc.next();
				} else if (element instanceof IData[]) {
					for (IData d : (IData[]) element) {
						removeNullValuesRecursively((IData) d);
					}
					hasNext = idc.next();
				} else {
					hasNext = idc.next();
				}
			}
			return data;
		}
	
	}
		
	// --- <<IS-END-SHARED>> ---
}

