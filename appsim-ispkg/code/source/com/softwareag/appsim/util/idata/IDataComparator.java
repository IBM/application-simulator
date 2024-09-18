package com.softwareag.appsim.util.idata;

import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.wm.data.IData;
import com.wm.data.IDataCursor;
import com.wm.data.IDataUtil;

public class IDataComparator {
	
	IData idata1 = null;
	IData idata2 = null;
	List<String> ignoreFieldList = null;
	
	public IDataComparator(IData idata1, IData idata2, List<String> ignoreFieldList) {
		super();
		this.idata1 = idata1;
		this.idata2 = idata2;
		this.ignoreFieldList = ignoreFieldList;
	}
	
	public boolean match() {
		boolean matches = true;
		IDataCursor idc1 = idata1.getCursor();
		IDataCursor idc2 = idata2.getCursor();
		try {
	
			while (idc1.next()) {
				String key = idc1.getKey();
				
				// Proceed with test if name of current field is not on ignore-list
				if ( (ignoreFieldList == null) || (!ignoreFieldList.contains(key)) ) {
					String value1 = IDataUtil.getString(idc1, key);
					String value2 = IDataUtil.getString(idc2, key);
					if (!StringUtils.equals(value1, value2)) {
						matches = false;
						break;
					}
				}
			}
		} finally {
			idc1.destroy();
			idc2.destroy();
		}
		return matches;
	}
	
}
