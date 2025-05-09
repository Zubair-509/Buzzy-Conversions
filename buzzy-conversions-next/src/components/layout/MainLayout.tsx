'use client';

import { ConversionProcess } from '../features/ConversionProcess';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light-primary to-background-light-tertiary dark:from-background-dark-primary dark:to-background-dark-tertiary py-12 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-10">
        <h1 className="text-5xl font-extrabold mb-2">Buzzy Conversions</h1>
        <p className="text-lg text-muted-foreground prose mx-auto">
          Convert your files to any format with ease
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ConversionProcess
          format="pdf"
          title="Convert to PDF"
          description="Convert any document to PDF format"
        />
        <ConversionProcess
          format="docx"
          title="Convert to DOCX"
          description="Convert documents to Microsoft Word format"
        />
        <ConversionProcess
          format="jpg"
          title="Convert to JPG"
          description="Convert images to JPG format"
        />
        <ConversionProcess
          format="png"
          title="Convert to PNG"
          description="Convert images to PNG format"
        />
        <ConversionProcess
          format="txt"
          title="Convert to TXT"
          description="Convert documents to plain text"
        />
        <ConversionProcess
          format="gif"
          title="Convert to GIF"
          description="Convert images to GIF format"
        />
      </div>
    </div>
  );
} 