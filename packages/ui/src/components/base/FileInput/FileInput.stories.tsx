import type { ComponentProps, ReactElement } from 'react';
import { useState } from 'react';

import type { FileUploadItem } from './FileInput.types';
import { FileInput } from './index';

const meta = {
  title: 'Base/FileInput',
  component: FileInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Untitled UI-inspired file uploader with drag-and-drop, validation, and upload progress states. Manage `files` in parent state for uploading, complete, and failed items.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    progressVariant: { control: 'select', options: ['bar', 'fill'] },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    className: { control: false },
    files: { control: false },
    onFilesAdd: { control: false },
    onFileRemove: { control: false },
    onFileRetry: { control: false },
    onFilesReject: { control: false },
  },
  args: {
    hint: 'SVG, PNG, JPG or GIF (max. 800x400px)',
    title: 'Click to upload and attach files',
    subtitle: 'or drag and drop',
    size: 'medium',
    progressVariant: 'bar',
    disabled: false,
    invalid: false,
    multiple: true,
  },
  decorators: [
    (Story: () => ReactElement) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type StoryProps = ComponentProps<typeof FileInput>;

const demoFiles: FileUploadItem[] = [
  {
    id: 'complete',
    name: 'Example dashboard screenshot.jpg',
    size: 737_280,
    status: 'complete',
    progress: 100,
  },
  {
    id: 'uploading',
    name: 'Tech design requirements_2.pdf',
    size: 737_280,
    status: 'uploading',
    progress: 50,
  },
  {
    id: 'failed',
    name: 'Tech design requirements.pdf',
    size: 1_048_576,
    status: 'failed',
    error: 'Upload failed',
  },
];

export const Default = {
  render: (args: StoryProps) => <FileInput {...args} />,
};

export const WithFileList = {
  render: (args: StoryProps) => (
    <FileInput
      {...args}
      files={demoFiles}
      onFileRemove={() => undefined}
      onFileRetry={() => undefined}
    />
  ),
};

export const ProgressFill = {
  render: (args: StoryProps) => (
    <FileInput
      {...args}
      progressVariant="fill"
      files={demoFiles}
      onFileRemove={() => undefined}
      onFileRetry={() => undefined}
    />
  ),
};

export const Disabled = {
  args: { disabled: true },
  render: (args: StoryProps) => <FileInput {...args} />,
};

export const Interactive = {
  render: () => {
    const InteractiveExample = () => {
      const [files, setFiles] = useState<FileUploadItem[]>([]);

      return (
        <FileInput
          accept="image/png,image/jpeg,.pdf"
          hint="Please upload PNG or JPEG images only."
          maxSize={1_048_576}
          files={files}
          onFilesAdd={(nextFiles) => {
            setFiles((current) => [
              ...current,
              ...nextFiles.map((file, index) => ({
                id: `${file.name}-${String(Date.now())}-${String(index)}`,
                name: file.name,
                size: file.size,
                status: 'uploading' as const,
                progress: 35,
                file,
              })),
            ]);
          }}
          onFileRemove={(id) => {
            setFiles((current) => current.filter((file) => file.id !== id));
          }}
          onFileRetry={(id) => {
            setFiles((current) =>
              current.map((file) =>
                file.id === id
                  ? { ...file, status: 'uploading', progress: 20, error: undefined }
                  : file,
              ),
            );
          }}
        />
      );
    };

    return <InteractiveExample />;
  },
};
