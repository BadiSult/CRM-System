// import React, { useEffect, useRef, useState } from 'react'
 
 
 

// export const AddTodo = () => {
//     const [input, setInput] = useState<string>('')
//     const inputRef = useRef<HTMLInputElement>(null)

//     useEffect(() => {
//         if (inputRef.current) {
//           inputRef.current.focus()
//         }
//       }, []) 

//     const handleSubmission = (e: React.FormEvent) => {
//         e.preventDefault()
//         if (input.trim() !== '') {
//             setTodos([...todos, input])
//             setInput('')
//           }
//       }

//     return (
//       <form>
//         <div className="flex items-center w-full max-w-lg gap-2 p-5 m-auto">
//           <input
//            ref={inputRef}
//             value={input}
//             onChange={e => setInput(e.target.value)}
//             type="text"
//             className="w-full px-5 py-2 bg-transparent border-2 outline-none border-zinc-600 rounded-xl placeholder:text-zinc-500 focus:border-white"
//             placeholder="start typing ..."
//           />
//           <button
//             type="submit"
//             className="px-5 py-2 text-sm font-normal text-blue-300 bg-blue-900 border-2 border-blue-900 active:scale-95 rounded-xl"
            
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     )
//   }