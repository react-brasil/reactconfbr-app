import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import Timeline from 'react-native-timeline-listview';
import Globals from '../Globals';

export default class Schedule extends Component {
  static route = {
    navigationBar: {
      title: 'AGENDA',
		},
	}

  constructor() {
    super();
    this.data = [
      { time: '09:00', title: 'Credenciamento' },
      { time: '09:30', title: 'Café da manhã e networking' },
      { time: '10:00', title: 'Abertura do evento', description: 'Keynote com Dan Abramov' },
      { time: '10:30', title: 'Vue é moda, React é foda', description: 'João da Silva conta sobre o que é ter estilo programando em React.' },
      { time: '11:30', title: 'Relay da Rapaziada', description: 'Grande Lucas Bento mandando uma talk sinistra pra galera sobre relay.' },
      { time: '13:00', title: 'Almoço' },
    ]
  }

  render() {
    const { container, description, list, options, time } = styles;
    return (
			<View style={container}>
				<Timeline 
          circleColor={Globals.colors.primary_blue}
          circleSize={15}
          data={this.data}
          descriptionStyle={description}
          lineColor={Globals.colors.primary_blue}
          options={{ style: options }}
          timeStyle={time}
          style={list}
        />
			</View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  description: {
    color: Globals.colors.gray
  },
  list: {
    flex: 1
  },
  options: {
    paddingTop: 5
  },
  time: {
    textAlign: 'center',
    backgroundColor: Globals.colors.primary_blue,
    color: Globals.colors.white,
    padding: 5,
    borderRadius: 13
  }
}