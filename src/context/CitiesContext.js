import { createContext, useContext, useEffect, useState } from 'react'

const CitiesContext = createContext()

const citiesOfTurkey = ['Adana', 'Adıyaman', 'Afyon', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya', 'Ardahan', 'Artvin', 
  'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 
  'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 
  'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul', 'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman', 
  'Kars', 'Kastamonu', 'Kayseri', 'Kırıkkale', 'Kırklareli', 'Kırşehir', 'Kilis', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 
  'Manisa', 'Mardin', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 
  'Sinop', 'Sivas', 'Şanlıurfa', 'Şırnak', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 
  'Zonguldak']

export const CitiesProvider = ( {children} ) => {
    const [city, setCity] = useState(() => { const city = localStorage.getItem("city") 
                                              return city || "İstanbul" })

    const getSelectedCity = (e) => {
        setCity(e.target.value)
    }

    useEffect(() => {
        localStorage.setItem("city", city)
    }, [city])

    return (
        <>
          <select value={ city } onChange={ getSelectedCity }>
          { 
            citiesOfTurkey.map((city, index) => <option key={index}>{ city }</option>)
          }
          </select>
          <br/>
          <CitiesContext.Provider value={ city }>{ children }</CitiesContext.Provider>
        </>
    )
}


export const useCity = () => useContext(CitiesContext)
