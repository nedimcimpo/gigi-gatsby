import React, { Component } from 'react';
import { ResponsivePie, ResponsiveBar } from 'nivo';

import './style.scss';

class Charts extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        15: {
          pie: [
            {
              id: 'm',
              label: 'Male',
              value: 3,
              color: 'hsl(81, 70%, 50%)',
            },
            {
              id: 'f',
              label: 'Female',
              value: 3,
              color: 'hsl(81, 70%, 50%)',
            },
          ],
          bar: [
            {
              label: 'Polaznici',
              count: 6,
              countColor: ' #4c4c4c',
            },
            {
              label: 'Zaposleno po zavrsetku',
              count: 5,
              countColor: ' #faa519',
            },
            {
              label: 'Trenutno u Mistralu',
              count: 2,
              countColor: '#00ad8d',
            },
          ],
        },
        16: {
          pie: [
            {
              id: 'm',
              label: 'Male',
              value: 5,
              color: 'hsl(81, 70%, 50%)',
            },
            {
              id: 'f',
              label: 'Female',
              value: 7,
              color: 'hsl(81, 70%, 50%)',
            },
          ],
          bar: [
            {
              label: 'Polaznici',
              count: 12,
              countColor: ' #4c4c4c',
            },
            {
              label: 'Zaposleno po zavrsetku',
              count: 7,
              countColor: ' #faa519',
            },
            {
              label: 'Trenutno u Mistralu',
              count: 5,
              countColor: '#00ad8d',
            },
          ],
        },
        17: {
          pie: [
            {
              id: 'm',
              label: 'Male',
              value: 14,
              color: 'hsl(81, 70%, 50%)',
            },
            {
              id: 'f',
              label: 'Female',
              value: 5,
              color: 'hsl(81, 70%, 50%)',
            },
          ],
          bar: [
            {
              label: 'Polaznici',
              count: 19,
              countColor: ' #4c4c4c',
            },
            {
              label: 'Zaposleno po zavrsetku',
              count: 10,
              countColor: ' #faa519',
            },
            {
              label: 'Trenutno u Mistralu',
              count: 10,
              countColor: '#00ad8d',
            },
          ],
        },
      },
      selected: 17,
      bgShow: false,
    };
  }

  changeChartsYear = id => {
    this.setState({
      selected: id,
    });
  };
  handleMouseEnter = () => {
    this.setState({ bgShow: true });
  };

  handleMouseLeave = () => {
    this.setState({ bgShow: false });
  };

  render() {
    const { data, selected, bgShow } = this.state;
    const bgc = bgShow ? 'about__gif show' : 'about__gif';
    return (
      <section
        id="about"
        className="charts flex flex-center flex-wrap flex-gap-2 mx-5 relative"
      >
        <h3 className="g-title mb-3 w-100">About Us</h3>
        <h5
          className={`mb-1 center data-switch ${selected === 15
            ? 'selected'
            : ''}`}
          onClick={selected === 15 ? undefined : e => this.changeChartsYear(15)}
        >
          2015
        </h5>
        <h5
          className={`mb-1 center data-switch ${selected === 16
            ? 'selected'
            : ''}`}
          onClick={selected === 16 ? undefined : e => this.changeChartsYear(16)}
        >
          2016
        </h5>
        <h5
          className={`mb-1 center data-switch ${selected === 17
            ? 'selected'
            : ''}`}
          onClick={selected === 17 ? undefined : e => this.changeChartsYear(17)}
        >
          2017
        </h5>
        <div className="charts__pie flex flex-center">
          <div className="w-50 p-5 py-0">
            <div className="charts__pie__chart">
              <ResponsivePie
                data={data[selected].pie}
                margin={{
                  top: 40,
                  right: 80,
                  bottom: 40,
                  left: 80,
                }}
                colors={['#5ab6d5', '#6e1036']}
                innerRadius={0.1}
                padAngle={2}
                enableRadialLabels={false}
                enableSlicesLabels
                sliceLabel="value"
                slicesLabelsTextColor="#ffffff"
                isInteractive={false}
              />
            </div>
            <div className="flex pb-2 flex-column">
              <div className="flex pb-2 flex-center">
                <div className="flex flex-center  pr-2">
                  <span className="flex h-1 w-1 mr-1 legend__male" /> Male
                </div>
                <div className="flex flex-center">
                  <span className="flex h-1 w-1 mr-1 legend__female" /> Female
                </div>
              </div>
            </div>
          </div>
          <div className="charts__pie__text p-5 py-0 justify">
            The aim of the school is to equip the participants with the skills
            they need for a good start in the software development industry.
            What better place to learn than in the company that specialises in
            software development. We started shy back in March 2015 with 6
            participants and 6 got a job at the end of the internship. To date,
            37 amazing people went through the program, 22 got a job at Mistral
            and the rest also found their place in the IT industry in Bosnia and
            Herzegovina, and abroad.
          </div>
        </div>
        <div className="charts__bar flex flex-center">
          <div className="charts__bar__text p-5  py-0 justify">
            During the 3 months at Gigi School, you will live Mistral, get to
            know its employees and join in all fun activities. You have a chance
            to become useful and promising junior after that period.
            <br />
            After the successful completion of the program, we expect you to be
            able to get the requirements from a client, analyze them, make a
            project plan, design a database, draw wireframes, make mockups,
            write code to provide Web API services and finally convert data to
            useful information directly to
            <span
              className="about__trigger"
              onMouseEnter={this.handleMouseEnter}
            >
              <a href="3"> user’s screen</a>
            </span>.
          </div>
          <div className="w-50 p-5  py-0">
            <div className="charts__bar__chart">
              <ResponsiveBar
                data={data[selected].bar}
                keys={['count']}
                indexBy="label"
                margin={{
                  top: 50,
                  right: 60,
                  bottom: 10,
                  left: 60,
                }}
                padding={0.4}
                maxValue={selected === 15 ? 8 : 'auto'}
                axisBottom={{
                  tickPadding: 20,
                  tickSize: 0,
                }}
                colorBy={({ id, data }) => data[`${id}Color`]}
                enableGridX={false}
                enableGridY
                enableLabel
                labelTextColor="#ffffff"
                isInteractive={false}
              />
            </div>
            <div className="flex pb-2 flex-column">
              <div className="flex pb-2 flex-center">
                <div className="flex flex-center pr-2">
                  <span
                    className="flex h-1 w-1 mr-1"
                    style={{
                      backgroundColor: data[selected].bar[0].countColor,
                    }}
                  />{' '}
                  Participants
                </div>
                <div className="flex flex-center pr-2">
                  <span
                    className="flex h-1 w-1 mr-1"
                    style={{
                      backgroundColor: data[selected].bar[1].countColor,
                    }}
                  />Employed upon completion
                </div>
                <div className="flex flex-center">
                  <span
                    className="flex h-1 w-1 mr-1"
                    style={{
                      backgroundColor: data[selected].bar[2].countColor,
                    }}
                  />Currently at Mistral
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          onMouseLeave={this.handleMouseLeave}
          className={bgc}
          style={{
            backgroundImage: 'url("./img/Video-6x.gif")',
          }}
        />
      </section>
    );
  }
}

export default Charts;
