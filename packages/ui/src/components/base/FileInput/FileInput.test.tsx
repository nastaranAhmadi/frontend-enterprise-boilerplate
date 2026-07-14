import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { FileInput } from './FileInput';
import type { FileUploadItem } from './FileInput.types';
import { formatFileSize, matchesAccept } from './FileInput.utils';

const createFile = (name: string, size = 1024, type = 'image/png'): File => {
  const file = new File(['x'.repeat(size)], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

const sampleFiles: FileUploadItem[] = [
  {
    id: '1',
    name: 'invoice.pdf',
    size: 720_000,
    status: 'complete',
    progress: 100,
  },
  {
    id: '2',
    name: 'design.pdf',
    size: 720_000,
    status: 'uploading',
    progress: 50,
  },
];

describe('FileInput utils', () => {
  it('formats file sizes', () => {
    expect(formatFileSize(720)).toBe('720 B');
    expect(formatFileSize(2048)).toBe('2 KB');
    expect(formatFileSize(1_048_576)).toBe('1.0 MB');
  });

  it('matches accept tokens', () => {
    const png = createFile('photo.png', 100, 'image/png');
    expect(matchesAccept(png, 'image/png')).toBe(true);
    expect(matchesAccept(png, '.png')).toBe(true);
    expect(matchesAccept(png, 'image/jpeg')).toBe(false);
  });
});

describe('FileInput', () => {
  it('renders dropzone and hint text', () => {
    render(
      <FileInput
        hint="SVG, PNG, JPG or GIF (max. 800x400px)"
        title="Click to upload and attach files"
      />,
    );

    expect(screen.getByRole('button')).toHaveTextContent('Click to upload and attach files');
    expect(screen.getByText('SVG, PNG, JPG or GIF (max. 800x400px)')).toBeInTheDocument();
  });

  it('forwards ref to the hidden file input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<FileInput ref={ref} />);
    expect(ref.current).toHaveAttribute('type', 'file');
  });

  it('calls onFilesAdd when files are selected', () => {
    const onFilesAdd = vi.fn();
    render(<FileInput onFilesAdd={onFilesAdd} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createFile('invoice.pdf', 100, 'application/pdf');

    fireEvent.change(input, { target: { files: [file] } });

    expect(onFilesAdd).toHaveBeenCalledWith([file]);
  });

  it('opens the file dialog on Enter', async () => {
    const user = userEvent.setup();
    const clickSpy = vi.spyOn(HTMLInputElement.prototype, 'click');

    render(<FileInput />);
    await user.tab();
    await user.keyboard('{Enter}');

    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('renders file list with statuses', () => {
    render(<FileInput files={sampleFiles} onFileRemove={() => undefined} />);

    expect(screen.getByText('invoice.pdf')).toBeInTheDocument();
    expect(screen.getByText('Uploading… 50%')).toBeInTheDocument();
    expect(screen.getAllByText(formatFileSize(720_000))).toHaveLength(2);
  });

  it('calls onFileRemove and onFileRetry', async () => {
    const user = userEvent.setup();
    const onFileRemove = vi.fn();
    const onFileRetry = vi.fn();

    render(
      <FileInput
        files={[
          {
            id: 'failed',
            name: 'broken.pdf',
            size: 1000,
            status: 'failed',
            error: 'Upload failed',
          },
        ]}
        onFileRemove={onFileRemove}
        onFileRetry={onFileRetry}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Try again' }));
    await user.click(screen.getByRole('button', { name: 'Remove broken.pdf' }));

    expect(onFileRetry).toHaveBeenCalledWith('failed');
    expect(onFileRemove).toHaveBeenCalledWith('failed');
  });

  it('rejects files that exceed maxSize', () => {
    const onFilesAdd = vi.fn();
    const onFilesReject = vi.fn();

    render(<FileInput maxSize={100} onFilesAdd={onFilesAdd} onFilesReject={onFilesReject} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createFile('large.pdf', 500, 'application/pdf');

    fireEvent.change(input, { target: { files: [file] } });

    expect(onFilesAdd).not.toHaveBeenCalled();
    expect(onFilesReject).toHaveBeenCalledWith([file], 'size');
  });
});
