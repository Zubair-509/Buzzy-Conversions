import FileConverter from '@/components/conversion/FileConverter';

export default function PdfToWordPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <FileConverter
        defaultFormat="docx"
        allowedTypes={{
          'application/pdf': ['.pdf'],
        }}
        title="PDF to Word Converter"
        description="Convert PDF files to editable Word documents with formatting preserved."
      />
    </div>
  );
} 