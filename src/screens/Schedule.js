//@flow
import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import Timeline from 'react-native-timeline-listview';
import Globals from '../Globals';
import I18n from '../i18n';

type ScheduleType = {
  time: string,
  title: string,
  description?: string,
  imageSrc?: string
}

type Schedules = Array<ScheduleType>;

const data: Schedules = [
    { time: '09:00', title: 'Registration' },
    { time: '09:30', title: 'Breakfast and networking' },
    {
      time: '10:00',
      title: 'Keynote with Dan Abramov',
      description: 'Event opening',
      imageSrc:
        'https://pbs.twimg.com/profile_images/826786122638426114/PR4tsq-i.jpg'
    },
    {
      time: '10:30',
      title: 'Vue é moda, React é foda aka Vue is strong, React is da bomb',
      description:
        'Bender Bendix Rodriguez talks about the awesomeness of coding with React',
     imageSrc: require('../../assets/images/bender.jpg')
    },
    {
      time: '11:30',
      title: 'Relay your way',
      description:
        'Great Lucas Bento will give us a great talk on the latest and greatest about relay.',
      imageSrc: require('../../assets/images/lucasbento.jpg')
    },
    { time: '13:00', title: 'Lunch' }
  ];

export default class Schedule extends Component {
  static navigationOptions = {
    title: I18n.t('schedule')
  };

  renderDetail = (rowData : ScheduleType) => {
    const { descriptionContainer, image, textDescription, title } = styles;
    let detailTitle = (
      <Text style={title}>
        {rowData.title}
      </Text>
    );
    let desc = null;

    if (rowData.description && rowData.imageSrc) {
      desc = (
        <View style={descriptionContainer}>
          <Image source={typeof rowData.imageSrc === 'string' ? { uri: rowData.imageSrc } : rowData.imageSrc } style={image} />
          <Text style={textDescription}>
            {rowData.description}
          </Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        {detailTitle}
        {desc}
      </View>
    );
  }

  render() {
    const { container, description, list, options, time } = styles;
    return (
      <View style={container}>
        <Timeline
          circleColor={Globals.colors.primary_blue}
          circleSize={15}
          data={data}
          descriptionStyle={description}
          lineColor={Globals.colors.primary_blue}
          options={{ style: options }}
          renderDetail={this.renderDetail}
          timeStyle={time}
          style={list}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    paddingTop: 10
  },
  description: {
    color: Globals.colors.gray
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 55,
    paddingTop: 5
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  list: {
    flex: 1,
    paddingLeft: 15
  },
  options: {
    paddingTop: 5
  },
  textDescription: {
    marginLeft: 10,
    color: Globals.colors.gray
  },
  time: {
    textAlign: 'center',
    backgroundColor: Globals.colors.primary_blue,
    color: Globals.colors.white,
    padding: 5,
    borderRadius: 13
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  }
};
