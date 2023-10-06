import {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// TODO
// make gird or wrap display (3 x 3)
// make success overlay
// Implement refresh button
// Try to refactor (useContext or useRef?...)
// Add confetti
// Add sounds/music
// Figure out how to share/push to phone


export default function App() {
  const [numbers, setNumbers] = useState([])
  const [total, setTotal] = useState(null)
  const [result, setResult] = useState(0)
  const [winner, setWinner] = useState(false)

  const RandNum = () => {
    return Math.ceil(Math.random() * 5)
  }

  useEffect(() => {
    const num1 = RandNum()
    const num2 = RandNum()
    setResult(num1 + num2)
    setNumbers([num1, num2])
  }, [])

  useEffect(() => {
    if(result === total) {
      setWinner(true)
    } else {
      setWinner(false)
    }
  }, [total])

  return (
    <>
      <View style={styles.container}>
        <CountElement num={numbers[0]} setTotal={setTotal}/>
        <Text style={styles.text}>+</Text>
        <CountElement num={numbers[1]} setTotal={setTotal}/>
        <Text style={styles.text}>=</Text>
        <ResultElement num={total}/>
      </View>
    </>
  )
};

function CountElement({num, setTotal}) {
  const [count, setCount] = useState(0)

  const displayBananas = (number) => {
    const bananas = []
    while(number > 0) {
      bananas.push(<Banana key={`banana${number}`} setCount={setCount} setTotal={setTotal}/>)
      number--
    }
    return bananas
  }

  return (
    <View>
      <View style={styles.countElementBananas}>
        {displayBananas(num)}
      </View>
      <Text style={styles.text}>{count > 0 ? count : ""}</Text>
    </View>
  );
}

function ResultElement({num}) {
  const displayBananas = (number) => {
    bananas = []
    while(number > 0) {
      bananas.push(<Text style={styles.banana}>🍌</Text>)
      number--
    }
    return bananas
  }

  return (
    <View>
      <View style={styles.countElementBananas}>
        {displayBananas(num)}
      </View>
      <Text style={num > 0 ? styles.text : {opacity: 0}}>{num}</Text>
    </View>
  );
}

function Banana({setCount, setTotal}) {
  const [touched, setTouched] = useState(false)

  const onPress = () => {
    if(touched){
      setCount(count => count - 1)
      setTotal(total => total - 1)
    } else {
      setCount(count => count + 1)
      setTotal(total => total + 1)
    }
    setTouched(!touched)
  }
  
  return (
    <View style={styles.banana}>
      <TouchableOpacity style={styles.touchOp} onPress={onPress}>
        <Text style={touched ? [styles.banana, styles.highlight] : styles.banana}>🍌</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countElementBananas: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80
  },
  banana: {
    fontSize: 40,
  },
  text: {
    fontSize: 40,
    alignSelf: 'center',
    margin: 10,
    color: 'rgba(0,0,0,0.6)'
  },
  highlight: {
    textShadowColor: '#3e3e3e',
    textShadowOffset: {width: 7, height: 3},
    textShadowRadius: 1
  },

});