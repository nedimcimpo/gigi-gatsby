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
  render() {
    const { data, selected } = this.state;
    return (
      <section
        id="about"
        className="charts flex flex-center flex-wrap flex-gap-2 mx-5 relative"
      >
        <h3 className="g-title mb-3 w-100">About</h3>
        <h5
          className={`mb-1 center data-switch ${selected === 15
            ? 'selected'
            : ''}`}
          onClick={
            selected === 15 ? undefined : () => this.changeChartsYear(15)
          }
        >
          2015
        </h5>
        <h5
          className={`mb-1 center data-switch ${selected === 16
            ? 'selected'
            : ''}`}
          onClick={
            selected === 16 ? undefined : () => this.changeChartsYear(16)
          }
        >
          2016
        </h5>
        <h5
          className={`mb-1 center data-switch ${selected === 17
            ? 'selected'
            : ''}`}
          onClick={
            selected === 17 ? undefined : () => this.changeChartsYear(17)
          }
        >
          2017
        </h5>
        <div className="charts__pie flex flex-center">
          <div className="w-50 p-5 py-0 charts__pie__svg">
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
              <div className="flex pb-2 flex-center legend__font__size">
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
            As Mistral grew, we realised that aspiring developers who were
            applying for work lacked knowledge and skills essential for the work
            we do. The aim of Gigi School of Coding is to equip you with the
            skills needed for a great start in the software development
            industry. What better place to learn than in the company that has
            owned this field for 7 executive years now? The bootcamp was
            launched back in March 2015 with 6 participants. All 6 got a job at
            the end of the bootcamp. To date, 37 amazing people went through the
            program, 22 got a job at Mistral and the rest also found their place
            in the IT industry in our country, and abroad.
          </div>
        </div>
        <div className="charts__bar flex flex-center">
          <div className="charts__bar__text p-5  py-0 justify">
            You will live Mistral for 3 months, get to know its employees and
            join in all epic activities. You have a chance to become a junior at
            Mistral and to contribute in making the web a better place for the
            biggest clients alongside the finest teams. After the successful
            completion of the program, we expect you to be able to get the
            requirements from a client, analyze them, make a project plan,
            design a database, draw wireframes, make mockups, write code to
            provide Web API services and finally convert data to useful
            information directly to user’s screen.
          </div>
          <div className="w-50 p-5 py-0 charts__bar__svg">
            <div className="charts__bar__chart">
              <ResponsiveBar
                data={data[selected].bar}
                keys={['count']}
                indexBy="label"
                margin={{
                  top: 50,
                  right: 60,
                  bottom: 20,
                  left: 10,
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
              <div className="flex pb-2 flex-center flex-column flex-start legend__font__size">
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
      </section>
    );
  }
}

export default Charts;
