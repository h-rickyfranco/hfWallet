import React from 'react';

// Define o tipo de props que o componente Select aceitará
type PropsType = {
  labelName: string;
  inputName: string;
  inputId: string;
  formValue: string;
  options: string[];
  changeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};

// Componente funcional Select que recebe as props definidas acima
function Select({
  labelName,
  inputName,
  inputId,
  formValue,
  changeHandler,
  options,
  className = '',
}: PropsType) {
  return (
    <div className="text-blue-700 flex gap-4 items-center">
      {/* Rótulo do campo de seleção */}
      <label htmlFor={ inputId }>{labelName}</label>
      {/* Campo de seleção */}
      <select
        id={ inputId }
        name={ inputName }
        value={ formValue }
        data-testid={ inputId }
        onChange={ changeHandler }
        className={ `outline-none py-1 border-2
        border-blue-500 rounded-lg font-light bg-slate-100 ${className}` }
      >
        {/* Mapeia as opções e cria um elemento <option> para cada uma */}
        {options.map((option) => (
          <option key={ option } value={ option }>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
