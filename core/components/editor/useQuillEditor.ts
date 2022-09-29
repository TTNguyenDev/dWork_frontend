import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import { QuillEditorPropsType } from './quillEditor';
// @ts-ignore
import MagicUrl from 'quill-magic-url';

export const useQuillEditor = (props: QuillEditorPropsType) => {
  const { placeholder, onChange, customRef, refQuill } = props;

  const modules: any = {
    toolbar: '#toolbar',
    clipboard: {
      matchVisual: false,
    },
    magicUrl: true,
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];
  useEffect(() => {
    const Quill = require('quill');
    Quill.register('modules/magicUrl', MagicUrl);
  }, []);

  const { quill, quillRef } = useQuill({
    theme: 'snow',
    modules,
    formats,
    placeholder,
  });

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta: any, oldDelta: any, source: any) => {
        onChange!(quill.root.innerHTML);
      });

      if (customRef) {
        customRef.current.clearContent = () => {
          quill.root.innerHTML = '';
        };
      }

      if (refQuill) refQuill.current = quill;
    }
  }, [quill]);

  return {
    props: {
      quill,
      quillRef,
    },
    methods: {},
  };
};
