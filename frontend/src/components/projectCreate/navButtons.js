import React from 'react';
import { featureCollection } from '@turf/helpers';
import { FormattedMessage, useIntl } from 'react-intl';

import messages from './messages';
import { Button } from '../button';

const clearParamsStep = (props) => {
  switch (props.index) {
    case 2: //clear Tasks
      props.mapObj.map.getSource('grid').setData(featureCollection([]));
      props.updateMetadata({ ...props.metadata, tasksNumber: 0 });
      break;
    case 3:
      props.mapObj.map.getSource('tiny-tasks').setData(featureCollection([]));
      props.updateMetadata({
        ...props.metadata,
        taskGrid: props.metadata.tempTaskGrid,
        tasksNumber: props.metadata.tempTaskGrid.features.length,
      });
      break;
    default:
      break;
  }

  let prevStep = props.index - 1;

  // If task is arbitrary. Jump to review.
  if (props.metadata.arbitraryTasks === true) {
    props.updateMetadata({ ...props.metadata, tasksNumber: 0 });
    if (props.metadata.geom.features) {
      props.updateMetadata({ ...props.metadata, tasksNumber: props.metadata.geom.features.length });
    }
    prevStep = 1;
  }
  props.setStep(prevStep);
};

const NavButtons = (props) => {
  const intl = useIntl();

  const validateStep = (props) => {
    switch (props.index) {
      case 1: // Set Project AOI.
        if (props.metadata.area >= props.maxArea) {
          const message = intl.formatMessage(messages.areaOverLimitError, { n: props.maxArea });
          return { error: true, message: message };
        } else if (props.metadata.area === 0) {
          const message = intl.formatMessage(messages.noGeometry);
          return { error: true, message: message };
        } else {
          const id = props.metadata.geom.features[0].id;
          props.mapObj.draw.delete(id);
          props.mapObj.map.getSource('aoi').setData(props.metadata.geom);
          props.updateMetadata({
            ...props.metadata,
            tasksNumber: props.metadata.arbitraryTasks
              ? props.metadata.geom.features.length
              : props.metadata.taskGrid.features.length,
          });
        }

        break;
      case 2: // Set Task grid.
        const taskGrid = props.mapObj.map.getSource('grid')._data;
        props.updateMetadata({ ...props.metadata, taskGrid: taskGrid, tempTaskGrid: taskGrid });
        break;
      case 3: // Trim Project.
        break;

      default:
        return;
    }
    let nextStep = props.index + 1;

    // If task is arbitrary. Jump to review.
    if (props.metadata.arbitraryTasks === true) {
      nextStep = 4;
    }
    props.setStep(nextStep);
    return { error: false, message: '' };
  };
  const stepHandler = (event) => {
    const resp = validateStep(props);
    props.setErr(resp);
  };

  return (
    <div className="pt3">
      {props.index === 1 ? null : (
        <Button onClick={() => clearParamsStep(props)} className="blue-dark bg-white mr3">
          <FormattedMessage {...messages.backToPrevious} />
        </Button>
      )}
      {props.index === 4 ? (
        <Button onClick={props.handleCreate} className="white bg-red">
          {props.cloneProjectData.name === null ? (
            <FormattedMessage {...messages.create} />
          ) : (
            <FormattedMessage {...messages.clone} />
          )}
        </Button>
      ) : (
        <Button onClick={stepHandler} className="white bg-red">
          <FormattedMessage {...messages.next} />
        </Button>
      )}
    </div>
  );
};

export default NavButtons;
