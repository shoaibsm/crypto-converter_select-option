import React, { useEffect, useRef, useState } from 'react'
import './Converter.scss'
import { FaEquals } from "react-icons/fa";
import { MdCurrencyBitcoin } from "react-icons/md";


function Converter() {

    const apiUrl = 'https://api.coingecko.com/api/v3/exchange_rates';
    const defaultFirstSelectValue = 'Bitcoin'
    const defaultSecondSelectValue = 'Ether'

    const [cryptoList, setCryptoList] = useState([])
    const inputValueRef = useRef(null)
    const [firstSelect, setFirstSelect] = useState(defaultFirstSelectValue)
    const [secondSelect, setSecondSelect] = useState(defaultSecondSelectValue)
    const [result, setResult] = useState()

    console.log('result ', result);

    useEffect(() => {
        fetchCryptoData()
    }, [])

    const fetchCryptoData = async () => {
        const response = await fetch(apiUrl)
        const jsonData = await response.json()

        const data = jsonData.rates

        const tempArray = Object.entries(data);

        const cryptoArray = tempArray.map((item) => {
            return {
                name: item[1].name,
                lable: item[1].name,
                rate: item[1].value
            }

        })
        setCryptoList(cryptoArray)
    }

    function handleConvert(event) {
        event.preventDefault();

        if (cryptoList.length == 0) return

        const firstSelectRate = cryptoList.find((item) => item.name === firstSelect)?.rate;
        const secondSelectRate = cryptoList.find((item) => item.name === secondSelect)?.rate;

        const inputValue = inputValueRef.current.value

        const resultValue = (inputValue * secondSelectRate) / firstSelectRate

        console.log('log for string result ', resultValue);

        setResult(resultValue.toFixed(3))
    }

    function handleFirstSelectChange(e) {

        setFirstSelect(e.target.value)
    }
    function handleSecondSelectChange(e) {

        setSecondSelect(e.target.value)
    }

    return (
        <div className='Converter'>
            <div className="Converter__heading">
                <div className="Converter__bitconBox">
                    <MdCurrencyBitcoin className='Converter__bitcoin' />
                </div>
                <h1 className='Converter__headingTxt'>Crypto Converter</h1>
            </div>
            <div className="Converter__card">
                <form className='Converter__inputBox' onSubmit={handleConvert}>

                    <input placeholder='Enter a number' className='Converter__inputValue' type="number" ref={inputValueRef} />

                </form>

                <div className='Converter__selectBox'>
                    <select className='Converter__select' onChange={handleFirstSelectChange} value={firstSelect}>
                        {cryptoList.map((crypto) => {
                            return (
                                <option key={crypto.name} value={crypto.name}>
                                    {crypto.name}
                                </option>
                            )
                        })}
                    </select>
                    <select className='Converter__select' value={secondSelect} onChange={handleSecondSelectChange}>
                        {cryptoList.map((crypto) => {
                            return (
                                <option key={crypto.name} value={crypto.name}>
                                    {crypto.name}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className="Converter__resultBox">
                    <p className='Converter__inputTxt'>{inputValueRef.current?.value ? inputValueRef.current?.value : '0'}</p>

                    <p className='Converter__firstSelect'>{firstSelect}</p>

                    <div className='Converter__equal'>
                        <FaEquals className='icon' />
                    </div>

                    <p className='Converter__result'>{result ? result : '0'}</p>

                    <p className='Converter__secondSelect'>{secondSelect}</p>
                </div>

                <button className='Converter__btn-convert' onClick={handleConvert}>Convert</button>

            </div>


        </div>
    )
}

export default Converter