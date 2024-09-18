package AppSim.impl.util;

// -----( IS Java Code Template v1.2

import com.wm.data.*;
import com.wm.util.Values;
import com.wm.app.b2b.server.Service;
import com.wm.app.b2b.server.ServiceException;
// --- <<IS-START-IMPORTS>> ---
import com.wm.util.security.Bytes;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.AndFileFilter;
import org.apache.commons.io.filefilter.CanReadFileFilter;
import org.apache.commons.io.filefilter.IOFileFilter;
import org.apache.commons.io.filefilter.TrueFileFilter;
import org.apache.commons.io.filefilter.WildcardFileFilter;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;
// --- <<IS-END-IMPORTS>> ---

public final class file

{
	// ---( internal utility methods )---

	final static file _instance = new file();

	static file _newInstance() { return new file(); }

	static file _cast(Object o) { return (file)o; }

	// ---( server methods )---




	public static final void createDirectory (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(createDirectory)>> ---
		// @sigtype java 3.5
		// [i] field:0:required directory
		// [o] field:0:required status
		// pipeline
		IDataCursor pipelineCursor = pipeline.getCursor();
			String	directory = IDataUtil.getString( pipelineCursor, "directory" );
		pipelineCursor.destroy();
			String status;
		// pipeline
		
		File file = new File(directory);
		if (file.exists()) {
		    status = "Success";
		} else {
			if (file.mkdirs()){
				status = "Success";
			}
			else{
				status = "Failed";
			}
			
		}
		
		// pipeline
		IDataCursor pipelineCursor_1 = pipeline.getCursor();
		
		IDataUtil.put( pipelineCursor_1, "status", status );
		pipelineCursor_1.destroy();
			
		// --- <<IS-END>> ---

                
	}



	public static final void dataToFile (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(dataToFile)>> ---
		// @sigtype java 3.5
		// [i] field:0:required fileName
		// [i] field:0:optional data
		// [i] object:0:optional stream
		// pipeline
		IDataCursor pipelineCursor = pipeline.getCursor();
			String	fileName = IDataUtil.getString( pipelineCursor, "fileName" );
			String	data = IDataUtil.getString( pipelineCursor, "data" );
			InputStream is = (InputStream) IDataUtil.get( pipelineCursor, "stream" );
		pipelineCursor.destroy();
		
		 
		try {
			if (data =="" || data == null){
				File fileb = new File(fileName);
		        try (FileOutputStream outputStream = new FileOutputStream(fileb, false)) {
		            int read;
		            byte[] bytes = new byte[8192];
		            while ((read = is.read(bytes)) != -1) {
		                outputStream.write(bytes, 0, read);
		            }
		        }
			    }
				
		
			else{
		
			FileWriter file = new FileWriter(fileName);
			file.write(data);
			file.close();
			}
		 
		}catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		// pipeline
			
		// --- <<IS-END>> ---

                
	}



	public static final void deleteFile (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(deleteFile)>> ---
		// @sigtype java 3.5
		// [i] field:0:required fileName
		// [i] field:0:optional isFolder
		// [o] field:0:required message
		// pipeline
		IDataCursor pipelineCursor = pipeline.getCursor();
			String	fileName = IDataUtil.getString( pipelineCursor, "fileName" );
			String	isFolder = IDataUtil.getString( pipelineCursor, "isFolder" );
		pipelineCursor.destroy();
		String message="";
		File file = new File(fileName);
		if(isFolder.contains("true")){
			deleteDirectory(file);
		}
		
			if (file.delete()) {
			    message="success";
			}
			else {
				message="Error. Unable delete the file";
			}
		
		// pipeline
		IDataCursor pipelineCursor_1 = pipeline.getCursor();
		IDataUtil.put( pipelineCursor_1, "message", message );
		pipelineCursor_1.destroy();
		
			
		// --- <<IS-END>> ---

                
	}



	public static final void getFile (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(getFile)>> ---
		// @sigtype java 3.5
		// [i] field:0:required filename
		// [i] field:0:optional loadAs
		// [o] field:0:required string
		// [o] object:0:optional bytes
		// pipeline
		IDataCursor pipelineCursor = pipeline.getCursor();
			String	filename = IDataUtil.getString( pipelineCursor, "filename" );
			String	loadAs = IDataUtil.getString( pipelineCursor, "loadAs" );
			String data = null;
			Object bytes = new Object();
		pipelineCursor.destroy();
		// pipeline
		IDataCursor pipelineCursor_1 = pipeline.getCursor();
		File file = new File(filename);
		
		try {
				if (loadAs.contains("bytes")){
				bytes = FileUtils.readFileToByteArray(file);
				IDataUtil.put( pipelineCursor_1, "bytes", bytes );
				}
				else{
				data = FileUtils.readFileToString(file, "UTF-8"); 
				IDataUtil.put( pipelineCursor_1, "string", data );
				}		
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		pipelineCursor_1.destroy();
			
		// --- <<IS-END>> ---

                
	}



	public static final void isDirectoryExists (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(isDirectoryExists)>> ---
		// @sigtype java 3.5
		// [i] field:0:required directory
		// [o] field:0:required isExists
		// pipeline
		IDataCursor pipelineCursor = pipeline.getCursor();
			String	directory = IDataUtil.getString( pipelineCursor, "directory" );
		pipelineCursor.destroy();	
		String status=null;
		// pipeline
		
		File file = new File(directory);
		if (file.exists()) {
		status = "true";
		} 
		else
		status = "false";
		
		// pipeline
		IDataCursor pipelineCursor_1 = pipeline.getCursor();
		
		IDataUtil.put( pipelineCursor_1, "isExists", status );
		pipelineCursor_1.destroy();
			
		// --- <<IS-END>> ---

                
	}



	public static final void listDirectories (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(listDirectories)>> ---
		// @sigtype java 3.5
		// [i] field:0:required directory
		// [o] field:1:required directoryNames
		// pipeline
		IDataCursor pipelineCursor = pipeline.getCursor();
			String	directory = IDataUtil.getString( pipelineCursor, "directory" );
			
		pipelineCursor.destroy();
		
		File[] directories = new File(directory).listFiles(File::isDirectory);
		
		String[] directoryNames = new String[directories.length];
		for (int i = 0; i < directories.length; i++) {
			directoryNames[i] = directories[i].getName();
		}
		
		// pipeline
		IDataCursor pipelineCursor_1 = pipeline.getCursor();
		IDataUtil.put( pipelineCursor_1, "directoryNames", directoryNames );
		pipelineCursor_1.destroy();
		// --- <<IS-END>> ---

                
	}



	public static final void listFiles (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(listFiles)>> ---
		// @sigtype java 3.5
		// [i] field:0:required directory
		// [i] field:0:required fileNameWildcards
		// [o] field:1:required fileNames
		// pipeline
		IDataCursor pipelineCursor = pipeline.getCursor();
			String	directory = IDataUtil.getString( pipelineCursor, "directory" );
			String	fileNameWildcards = IDataUtil.getString( pipelineCursor, "fileNameWildcards" );
		pipelineCursor.destroy();
		
		
		// Filter for all criteria (name, readable, writable)
		List<IOFileFilter> filerList = new ArrayList<IOFileFilter>();
		if (StringUtils.isNotEmpty(fileNameWildcards)) {
			filerList.add(new WildcardFileFilter(fileNameWildcards));
		}
		filerList.add(CanReadFileFilter.CAN_READ);
		//		filerList.add(CanWriteFileFilter.CAN_WRITE);
		IOFileFilter fileFilter = new AndFileFilter(filerList);
		
		File searchDir = new File(directory);
		List<File> foundFiles = (List<File>) FileUtils.listFiles(searchDir, fileFilter, TrueFileFilter.INSTANCE);
		if (foundFiles != null && !foundFiles.isEmpty()) {
			
			String[] result = new String[foundFiles.size()];
			for (int i = 0; i < result.length; i++) {
				try {
					result[i] = foundFiles.get(i).getCanonicalPath();
				} catch (IOException e) {
					throw new ServiceException("Error while trying to get canonical name of '"
							+ foundFiles.get(i).getAbsolutePath() + "': "
							+ ExceptionUtils.getStackTrace(e));
				}
			}
			// pipeline
			IDataCursor pipelineCursor_1 = pipeline.getCursor();
			
			IDataUtil.put( pipelineCursor_1, "fileNames", result );
			pipelineCursor_1.destroy();
		}
		
		
			
			
			
			
			
		// --- <<IS-END>> ---

                
	}



	public static final void renameFile (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(renameFile)>> ---
		// @sigtype java 3.5
		// [i] field:0:required currentFileName
		// [i] field:0:required newFileName
		// [o] field:0:required message
		// pipeline
		IDataCursor pipelineCursor = pipeline.getCursor();
			String	currentFileName = IDataUtil.getString( pipelineCursor, "currentFileName" );
			String	newFileName = IDataUtil.getString( pipelineCursor, "newFileName" );
		pipelineCursor.destroy();
		
		String message="";
		File current = new File(currentFileName);
		
		File newname = new File(newFileName);
		  
		 
		if (current.renameTo(newname)) {
		    message="success";
		}
		else {
		    message="error";
		}
		
		
		// pipeline
		IDataCursor pipelineCursor_1 = pipeline.getCursor();
		IDataUtil.put( pipelineCursor_1, "message", message );
		pipelineCursor_1.destroy();
			
		// --- <<IS-END>> ---

                
	}



	public static final void zipFileCreateAndExtract (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(zipFileCreateAndExtract)>> ---
		// @sigtype java 3.5
		// [i] field:0:required zipFilePath
		// [i] field:0:required fileDirectory
		// [i] field:0:optional operation
		// [o] field:0:required message
		// [o] field:0:required size
		// pipeline
				IDataCursor pipelineCursor = pipeline.getCursor();
					String	fileDirectory = IDataUtil.getString( pipelineCursor, "fileDirectory" );
					String	zipFile = IDataUtil.getString( pipelineCursor, "zipFilePath" );
					String operation=IDataUtil.getString( pipelineCursor, "operation" );
				pipelineCursor.destroy();
				String message = "";
				long size=0;
				int fileCount=0;
				if(operation.contains("unzip")){
					File dir = new File(fileDirectory);
			        // create output directory if it doesn't exist
			        if(!dir.exists()) dir.mkdirs();
			        FileInputStream fis;
			        //buffer for read and write data to file
			        byte[] buffer = new byte[1024];
			        try {
			            fis = new FileInputStream(zipFile);
			            ZipInputStream zis = new ZipInputStream(fis);
			
			            ZipEntry ze = zis.getNextEntry();
			            
			            while(ze != null){
			                String fileName = ze.getName();
			                size+=ze.getSize();
			                fileCount+=1;
			                File newFile = new File(fileDirectory + File.separator + fileName);
			                
			                //create directories for sub directories in zip
			                new File(newFile.getParent()).mkdirs();
			                FileOutputStream fos = new FileOutputStream(newFile);
			                int len;
			                while ((len = zis.read(buffer)) > 0) {
			                fos.write(buffer, 0, len);
			                }
			                fos.close();
			                //close this ZipEntry
			                zis.closeEntry();
			                ze = zis.getNextEntry();
			            }
			            //close last ZipEntry
			            zis.closeEntry();
			            zis.close();
			            fis.close();
			            message="success";
			        } catch (IOException e) {
			            e.printStackTrace();
			            message=e.toString();
			        }
			        
			    
				}
				else
				{
				File dir = new File(fileDirectory);
		
				List<String> filesListInDir = new ArrayList<String>();
				String name="";
				File[] files = dir.listFiles();
				for(File file : files){
				    if(file.isFile()){ 
				    name=file.getName();
				    if(!name.contains(".aspwd"))
				    	filesListInDir.add(file.getAbsolutePath());
				}
				}
				FileOutputStream fos;
				try {
					fos = new FileOutputStream(zipFile);
				    ZipOutputStream zos = new ZipOutputStream(fos);
				    for(String filePath : filesListInDir){
				        
				        //for ZipEntry we need to keep only relative file path, so we used substring on absolute path
				        ZipEntry ze = new ZipEntry(filePath.substring(dir.getAbsolutePath().length()+1, filePath.length()));
				        zos.putNextEntry(ze);
				        //read the file and write to ZipOutputStream
				        FileInputStream fis = new FileInputStream(filePath);
				        byte[] buffer = new byte[1024];
				        int len;
				        while ((len = fis.read(buffer)) > 0) {
				            zos.write(buffer, 0, len);
				        }
				        zos.closeEntry();
				        fis.close();
				    }
				    zos.close();
				    fos.close();
				    message="success";
				
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					message=e.toString();
				}
				}
		
		
				// pipeline
				IDataCursor pipelineCursor_1 = pipeline.getCursor();
				IDataUtil.put( pipelineCursor_1, "message", message );
				IDataUtil.put( pipelineCursor_1, "size", Float.toString(size/1024) );
				IDataUtil.put( pipelineCursor_1, "fileCount", fileCount );
				pipelineCursor_1.destroy();
			
		// --- <<IS-END>> ---

                
	}

	// --- <<IS-START-SHARED>> ---
	public static void deleteDirectory(File file)
	{
	
	    for (File subfile : file.listFiles()) {    
	        if (subfile.isDirectory()) {
	            deleteDirectory(subfile);
	        }
	        subfile.delete();
	    }
	}
	// --- <<IS-END-SHARED>> ---
}

