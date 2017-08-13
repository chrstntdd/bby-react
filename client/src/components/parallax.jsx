import React from 'react';

import './parallax.scss';

export default class Parallax extends React.Component {
  FALLBACK_LIMIT = 720;
  getInitialState() {
    return {
      shouldFallback: window.innerWidth < this.FALLBACK_LIMIT,
      position: 'inital'
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.position);
    document.addEventListener('scroll', this.position);

    let img = new Image();
    img.src = this.props.fallback;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.position);
    document.removeEventListener('scroll', this.position);
  }

  position() {
    requestAnimationFrame(() => {
      let scrollTop = Math.max(
        document.body.scrollTop,
        document.documentElement.scrollTop
      );

      let viewportHeight = window.innerHeight;
      let viewportWidth = window.innerWidth;
      let widget = this.refs.widget;
      let widgetDimensions = widget.getBoundingClientRect();
      let { top, bottom, height } = widgetDimensions;

      if (bottom < 0 || top > viewportHeight) {
        return;
      }

      this.setState({
        shouldFallback: viewportWidth < this.FALLBACK_LIMIT,
        position: {
          top,
          bottom,
          height,
          viewportHeight,
          scrollTop
        }
      });
    });
  }

  getStaticLayer() {
    let { blockName } = this;

    return (
      <div className={`${blockName}__layer ${blockName}__layer--static`}>
        <a href={this.props.href}>
          <h3 className={`${blockName}__title`}>
            {this.props.title}
          </h3>
          <p>
            {this.props.description}
          </p>
        </a>
      </div>
    );
  }

  render() {
    let { background, fallback } = this.props;
    let { shouldFallback, position } = this.state;
    let { top, bottom, viewportHeight, height } = position;

    let blockName = (this.blockName = 'react-parallax');
    let blockStyle = {
      height: this.props.height,
      backgroundImage: `url(${shouldFallback ? fallback : background})`
    };

    if (shouldFallback) {
      return (
        <div className={blockName} style={blockStyle} ref="widget">
          {this.getStaticLayer()}
        </div>
      );
    } else {
      return (
        <div className={blockName} style={blockStyle} ref="widget">
          <div className={`${blockName}__layers`}>
            {this.props.layers.map((layer, index, layers) => {
              let layerTop = 0;
              if (position !== 'initial') {
                layerTop =
                  height /
                  (viewportHeight / top) /
                  ((layers.length - index) / 1.25);
              }
              let layerStyle = {
                transform: `translateY(${layerTop}px)`
              };
              return (
                <img
                  className={`${blockName}__layer`}
                  style={layerStyle}
                  src={layer}
                />
              );
            })}
            {this.getStaticLayer()}
          </div>
        </div>
      );
    }
  }
}
