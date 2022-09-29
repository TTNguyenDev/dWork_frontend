import dynamic from 'next/dynamic';
import { QuillEditorPropsType } from './quillEditor';

const QuillEditor = dynamic(() => import('./quillEditor'), {
  ssr: false,
});

export function Editor(props: QuillEditorPropsType) {
  return <QuillEditor {...props} />;
}
