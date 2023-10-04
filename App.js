import {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// TODO
// Sort layout
// Make fixed landscape orientation
// have the result include small emojiis too (as a tally)
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
    <View style={styles.container}>
      <CountElement num={numbers[0]} setTotal={setTotal}/>
      <Text style={styles.text}>+</Text>
      <CountElement num={numbers[1]} setTotal={setTotal}/>
      <Text style={styles.text}>=</Text>
      <Text style={styles.text}>{total}</Text>
      {winner ? <Text style={styles.text}>You did it!</Text> : <Text></Text>}
    </View>
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
      {displayBananas(num)}
      <Text style={styles.text}>{count}</Text>
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
    <TouchableOpacity onPress={onPress}>
      <Text style={touched ? [styles.text, styles.highlight] : styles.text}>🍌</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
  },
  redBG: {
    backgroundColor: 'red',
  },
  blueBG: {
    backgroundColor: 'blue'
  },
  highlight: {
    textShadowColor: '#3e3e3e',
    textShadowOffset: {width: 7, height: 3},
    textShadowRadius: 1
  }
});