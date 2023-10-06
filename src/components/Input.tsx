import React from 'react';

// Define o tipo de props que o componente Input aceitará
type PropsType = {
  inputType: string;
  labelName: string;
  inputName: string;
  inputId: string;
  formValue: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

// Componente funcional Input que recebe as props definidas acima
function Input({
  inputType,
  labelName,
  inputName,
  inputId,
  formValue,
  changeHandler,
  className = '',
}: PropsType) {
  return (
    <div className="text-blue-700 flex gap-4 items-center">
      {/* Rótulo do campo de entrada */}
      <label htmlFor={ inputId }>{labelName}</label>
      {/* Campo de entrada de texto */}
      <input
        type={ inputType }
        id={ inputId }
        name={ inputName }
        value={ formValue }
        data-testid={ inputId }
        onChange={ changeHandler }
        className={ `outline-none py-1 border-2
        border-blue-500 rounded-lg font-light bg-slate-100 ${className}` }
      />
    </div>
  );
}

export default Input;
