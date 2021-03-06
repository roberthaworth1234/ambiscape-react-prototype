import React, { Component } from "react";
import ChannelCard from "./ChannelCard";
import * as api from "./utils/api";

class ChannelList extends Component {
  state = {
    highlightedChannel: "",
    bgSounds: [
      {
        id: 1,
        name: "Italian Birds",
        slug: "italianbirds",
        type: "background",
        loop: true,
        urls: ["italian-birds.ogg"],
        sprite: {}
      }
    ],
    randomSounds: [
      {
        id: 2,
        name: "Blackbird",
        slug: "blackbird",
        type: "random",
        loop: false,
        urls: [
          "blackbird-sprite.ogg",
          "blackbird-sprite.m4a",
          "blackbird-sprite.mp3",
          "blackbird-sprite.ac3"
        ],
        sprite: {
          blackbird1: [0, 3342.2222222222226],
          blackbird2: [5000, 2602.0861678004535],
          blackbird3: [9000, 2793.650793650794],
          blackbird5: [13000, 3789.2063492063494],
          blackbird6: [18000, 2099.9546485260757],
          blackbird7: [22000, 2515.011337868479],
          blackbird8: [26000, 3121.6326530612264],
          blackbird9: [31000, 2935.873015873014],
          blackbird10: [35000, 4482.902494331064],
          blackbird11: [41000, 4009.795918367345],
          blackbird12: [47000, 3243.537414965985],
          blackbird13: [52000, 3112.9251700680243],
          blackbird14: [57000, 4018.5034013605473],
          blackbird15: [63000, 2950.385487528351],
          blackbird16: [67000, 2973.605442176876]
        }
      },
      {
        id: 3,
        name: "Song Thrush",
        slug: "songthrush",
        type: "random",
        loop: false,
        urls: [
          "song-thrush-sprite.ogg",
          "song-thrush-sprite.m4a",
          "song-thrush-sprite.mp3",
          "song-thrush-sprite.ac3"
        ],
        sprite: {
          "song thrush 1": [0, 2187.02947845805],
          "song thrush 2": [4000, 2175.4195011337865],
          "song thrush 3": [8000, 1264.0362811791376],
          "song thrush 4": [11000, 3922.721088435374],
          "song thrush 5": [16000, 3388.6621315192756]
        }
      },
      {
        id: 4,
        name: "Cuckoo",
        slug: "cuckoo",
        type: "random",
        loop: false,
        urls: [
          "cuckoo-sprite.ogg",
          "cuckoo-sprite.m4a",
          "cuckoo-sprite.mp3",
          "cuckoo-sprite.ac3"
        ],
        sprite: {
          "cuckoo 2": [0, 2314.739229024943],
          "cuckoo 3": [4000, 3847.2562358276646],
          "cuckoo 4": [9000, 642.9024943310661],
          "cuckoo 5": [11000, 2082.5396825396824],
          "cuckoo 6": [15000, 3710.8390022675726],
          "cuckoo 7": [20000, 5214.331065759638]
        }
      },
      {
        id: 5,
        name: "Chaffinch",
        slug: "chaffinch",
        type: "random",
        loop: false,
        urls: [
          "chaffinch-sprite.ogg",
          "chaffinch-sprite.m4a",
          "chaffinch-sprite.mp3",
          "chaffinch-sprite.ac3"
        ],
        sprite: {
          chaffinch: [0, 2201.541950113379],
          chaffinch2: [4000, 2277.0068027210878],
          "chaffinch 3": [8000, 1893.8775510204077],
          "chaffinch 4": [11000, 2555.6462585034014],
          "chaffinch 5": [15000, 3417.6870748299316],
          "chaffinch 6": [20000, 2320.5442176870756]
        }
      }
    ],
    scenario: {
      name: "Italian Birds",
      slug: "italianbirds",
      creator_id: 1,
      color_scheme: ["#561D25", "#CE8147", "#ECDD7B", "#D3E298", "#CDE7BE"],
      public: true,
      likes: 0,
      bg_sounds: [
        {
          id: 1,
          vol: 0.7,
          pan: 0.5
        }
      ],
      random_sounds: [
        {
          id: 2,
          vol: 0.7,
          pan: 0.5,
          freq: 0.5
        },
        {
          id: 3,
          vol: 0.7,
          pan: 0.5,
          freq: 0.5
        },
        {
          id: 4,
          vol: 0.7,
          pan: 0.5,
          freq: 0.5
        },
        {
          id: 5,
          vol: 0.7,
          pan: 0.5,
          freq: 0.5
        }
      ]
    }
  };

  highlightChannel = channelSlug => {
    this.setState({ highlightedChannel: channelSlug });
  };

  getScenario = () => {
    const { scenario } = this.props;
    const fetchedScenario = api.getScenarioBySlug(scenario);
    this.setState({ scenario: fetchedScenario });
  };

  getSounds = () => {
    const { bg_sounds, random_sounds } = this.state.scenario;
    let bgSounds = [];
    let randomSounds = [];
    bg_sounds.forEach(sound => {
      const thisSound = api.getSoundById(sound.id);
      bgSounds.push(thisSound);
    });
    random_sounds.forEach(sound => {
      const thisSound = api.getSoundById(sound.id);
      randomSounds.push(thisSound);
    });
    this.setState({ bgSounds: bgSounds, randomSounds: randomSounds });
  };

  changeVolume = (target_id, value) => {
    const { bg_sounds, random_sounds } = this.state.scenario;
    const filteredBg = bg_sounds.filter(sound => {
      return sound.id === target_id;
    })[0];
    const filteredRandom = random_sounds.filter(sound => {
      return sound.id === target_id;
    })[0];
    if (filteredBg) {
      filteredBg.vol = value;
      this.setState(currentState => {
        return {
          ...currentState,
          scenario: {
            ...currentState.scenario,
            bg_sounds: [
              ...currentState.scenario.bg_sounds.filter(sound => {
                return sound.id !== target_id;
              }),
              filteredBg
            ]
          }
        };
      });
    } else if (filteredRandom) {
      filteredRandom.vol = value;
      this.setState(currentState => {
        return {
          ...currentState,
          scenario: {
            ...currentState.scenario,
            random_sounds: [
              ...currentState.scenario.random_sounds.filter(sound => {
                return sound.id !== target_id;
              }),
              filteredRandom
            ]
          }
        };
      });
    } else return null;
  };

  toggleHighlightedChannel = slug => {
    const { highlightedChannel } = this.state;
    this.setState({
      highlightedChannel: highlightedChannel === slug ? "" : slug
    });
  };

  componentDidMount() {
    this.getScenario();
    this.getSounds();
  }

  render() {
    const styling = {
      // border: "1px solid",
      listStyle: "none",
      padding: "0px",
      backgroundColor: "#D3E298"
    };

    const { bgSounds, randomSounds, highlightedChannel } = this.state;
    const { bg_sounds, random_sounds } = this.state.scenario;
    return (
      <div>
        <ul style={styling}>
          <li key="bglabel">Background Sounds</li>
          {bgSounds.map(bgSound => {
            return (
              <ChannelCard
                sound={bgSound}
                key={bgSound.id}
                changeVolume={this.changeVolume}
                highlightChannel={this.highlightChannel}
                isHighlighted={
                  highlightedChannel === bgSound.slug ? true : false
                }
                toggleHighlight={this.toggleHighlightedChannel}
              />
            );
          })}
          <li>+</li>
          <li key="randomlabel">Random Sounds</li>
          {randomSounds.map(randomSound => {
            return (
              <ChannelCard
                sound={randomSound}
                key={randomSound.id}
                changeVolume={this.changeVolume}
                highlightChannel={this.highlightChannel}
                isHighlighted={
                  highlightedChannel === randomSound.slug ? true : false
                }
                toggleHighlight={this.toggleHighlightedChannel}
              />
            );
          })}
          <li>+</li>
        </ul>
      </div>
    );
  }
}

export default ChannelList;
