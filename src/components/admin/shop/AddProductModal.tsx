// 'use client'
// import { motion } from "framer-motion"
// import Form from 'next/form'

// type Props = {}

// const AddProductModal = (props: Props) => {

//   return (
//     <motion.div>
//       <Form action="">

//       </Form>
//     </motion.div>
//   )
// }

// export default AddProductModal

"use client";

import { motion } from "framer-motion";
import React from "react";

interface AddProductModalProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="modal"
        >
            <form>
                <h2 className="text-lg font-bold mb-4">Add New Product</h2>

                {/* Example input */}
                <input type="text" placeholder="Product Name" className="border rounded p-2 w-full mb-4" />

                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                        Save
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddProductModal;
