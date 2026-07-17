import { supabase } from '../supabase';

const BUCKET = 'uploads';

// Upload any file to Supabase Storage and return public URL
const uploadFile = async (path, file, onProgress) => {
  // Supabase doesn't support progress natively, so simulate it
  onProgress?.(30);

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    console.error("SUPABASE UPLOAD ERROR:", error);
    if (error.statusCode === '400' || error.message?.includes('Bucket not found')) {
      throw new Error("BUCKET_NOT_FOUND");
    }
    throw new Error(error.message || JSON.stringify(error));
  }

  onProgress?.(90);

  // Get the public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(data.path);

  onProgress?.(100);

  return urlData.publicUrl;
};

// Upload profile photo
export const uploadProfilePhoto = async (userId, file, onProgress) => {
  const ext = file.name.split('.').pop();
  const path = `users/${userId}/profile/${Date.now()}.${ext}`;
  return await uploadFile(path, file, onProgress);
};

// Upload document image (biodata/resume photo)
export const uploadDocumentImage = async (userId, docId, file, onProgress) => {
  const ext = file.name.split('.').pop();
  const path = `users/${userId}/documents/${docId}/${Date.now()}.${ext}`;
  return await uploadFile(path, file, onProgress);
};

// Delete a file by its public URL
export const deleteFile = async (fileUrl) => {
  try {
    // Extract path from public URL
    const urlParts = fileUrl.split(`/${BUCKET}/`);
    if (urlParts.length < 2) return;
    const filePath = urlParts[1];
    await supabase.storage.from(BUCKET).remove([filePath]);
  } catch (error) {
    console.error('Delete file error:', error);
  }
};

export const isStorageEnabled = true;
