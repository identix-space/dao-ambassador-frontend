import React, {useEffect, useState} from 'react';
import {SelectProps} from './Select.props';
import Select, {StylesConfig} from 'react-select';
import {useValueStorage} from './valueStorage';

type MyOptionType = {
  value: number;
  label: string;
};
type IsMulti = false;

const oneMonth = 1000 * 60 * 60 * 24 * 30;

export const SelectBlock = ({placeholder = '', ...props}: SelectProps): JSX.Element => {

  const {value, setValue} = useValueStorage();

  const [options, setOptions] = useState<MyOptionType[]>();

  useEffect(() => {
    setOptions([{value: oneMonth, label: '1 month'}, {value: oneMonth * 3, label: '3 months'}, {value: oneMonth * 6, label: '6 months'}, {value: oneMonth * 12, label: '1 year'}]);
  }, []);

  const customStyles: StylesConfig<MyOptionType, IsMulti> = {
    option: (provided, state) => ({
      ...provided,
      height: '48px',
      color: 'black',
      fontWeight: '700',
      fontSize: '20px',
      padding: '10px 25px',
      backgroundColor: state.isSelected ? 'rgba(143, 90, 224, 0.15)' : '#FFFFFF'
    }),
    control: (provided) => ({
      ...provided,
      height: '48px',
      background: value ? 'white' : 'linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)), linear-gradient(117.58deg, #CB88FF -8.22%, #FF8AA6 62.35%, #F9A279 131.36%), linear-gradient(112.95deg, #5755FF -13.39%, #FF8AA6 118.44%), #150B4D',
      borderRadius: '15px',
      border: '2px solid #DBC1EB',
      outline: 0
    }),
    container: (provided) => ({
      ...provided,
      width: '100%'
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: '2px',
      padding: 0,
      borderRadius: '0 0 15px 15px'
    }),
    singleValue: (provided) => ({
      ...provided,
      fontWeight: '700',
      fontSize: '20px',
      color: '#150B4D'
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '2px 22px'
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      color: '#0BCDED'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: value ? '#150B4D' : 'white'
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'white',
      fontWeight: '700',
      fontSize: '20px'
    })
  };

  return (
    <div {...props}>
      <Select styles={customStyles} options={options} placeholder={placeholder} onChange={(option) => {
        setValue(option!.value);
      }}/>
    </div>
  );
};
