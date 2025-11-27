import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

interface InputProps {
    name: string,
    label?: string,
    type: string,
    placeholder?: string,
    value: any,
    onChange: any,
    editable?: boolean,
}

const Input = ({ name, label, type, placeholder, value, onChange, editable = true }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col">
                {label && (<label htmlFor={name} className="text-sm mb-1">{label}</label>)}
                <div className="relative">
                  
                    <input disabled={!editable} onChange={onChange} value={value} type={showPassword ? 'text' : type} id={name} placeholder={placeholder} className={`input ${type === 'password' ? 'pr-9 pl-2' : 'px-2'}`} />
                    
                    {type === 'password' && (
                        <div onClick={togglePassword} className="absolute bottom-[7px] cursor-pointer right-2 rounded-r-xl">
                            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                        </div>)}
                </div>
            </div>
        </div>
    )
}

export default Input