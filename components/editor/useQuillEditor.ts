import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import { create as ipfsClient } from 'ipfs-http-client';
import { QuillEditorPropsType } from './quillEditor';
import { toast } from 'react-toastify';
import ImageUploader from '../../utils/quill/imageUploader/quill.imageUploader';

const IPFS_BASE_URL = 'https://ipfs.infura.io/ipfs/';

export const useQuillEditor = (props: QuillEditorPropsType) => {
    const { placeholder, onChange, customRef, refQuill } = props;

    const ipfs = ipfsClient({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
    });

    const modules: any = {
        toolbar: '#toolbar',
        clipboard: {
            matchVisual: false,
        },
        imageUploader: {
            upload: (file: Blob) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(file);

                    reader.onloadend = () => {
                        // @ts-ignore
                        const result = new Buffer(reader.result);
                        // @ts-ignore
                        ipfs.add(result)
                            .then((res) => {
                                const url = IPFS_BASE_URL + res.path;
                                resolve(url);
                            })
                            .catch((err) => {
                                toast(
                                    'Sorry! There was an error uploading the image',
                                    {
                                        type: 'error',
                                    }
                                );
                            })
                            .finally(() => {});
                    };
                });
            },
        },
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

        Quill.register('modules/imageUploader', ImageUploader);
    }, []);

    const { quill, quillRef } = useQuill({
        theme: 'snow',
        modules,
        formats,
        placeholder,
    });

    useEffect(() => {
        if (quill) {
            quill.on(
                'text-change',
                (delta: any, oldDelta: any, source: any) => {
                    onChange!(quill.root.innerHTML);
                }
            );

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
