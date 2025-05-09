import FileConverter from '@/components/conversion/FileConverter';

export default function ConvertPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <FileConverter
        defaultFormat="pdf"
        allowedTypes={{
          'application/pdf': ['.pdf'],
          'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
          'audio/*': ['.mp3', '.wav', '.ogg', '.m4a'],
        }}
        title="Convert Your Files"
        description="Drop your files below and choose your desired output format"
      />
    </div>
  );
} 