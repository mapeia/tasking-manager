import React from 'react';
import { FormattedMessage } from 'react-intl';

import projectMessages from './messages';
import userDetailMessages from '../userDetail/messages';
import { MappingIcon, HomeIcon, RoadIcon, EditIcon } from '../svgIcons';
import { StatsCard } from '../statsCard';

export const EditsStats = ({ data }) => {
  const { changesets, buildings, roads, edits } = data;

  const iconClass = 'h-50 w-50';
  const iconStyle = { height: '45px' };

  return (
    <div className="cf w-100 pb4 ph2 ph4-ns blue-dark">
      <h3 className="barlow-condensed ttu f3">
        <FormattedMessage {...projectMessages.edits} />
      </h3>
      <div className="cf db pb2">
        <StatsCard
          field={'changesets'}
          icon={<MappingIcon className={iconClass} style={iconStyle} />}
          description={<FormattedMessage {...projectMessages.changesets} />}
          value={changesets || 0}
          className={'w-25-l w-50-m w-100 mv1'}
        />
        <StatsCard
          icon={<EditIcon className={iconClass} style={iconStyle} />}
          description={<FormattedMessage {...projectMessages.totalEdits} />}
          value={edits || 0}
          className={'w-25-l w-50-m w-100 mv1'}
        />
        <StatsCard
          icon={<HomeIcon className={iconClass} style={iconStyle} />}
          description={<FormattedMessage {...userDetailMessages.buildingsMapped} />}
          value={buildings || 0}
          className={'w-25-l w-50-m w-100 mv1'}
        />
        <StatsCard
          icon={<RoadIcon className={iconClass} style={iconStyle} />}
          description={<FormattedMessage {...userDetailMessages.roadMapped} />}
          value={roads || 0}
          className={'w-25-l w-50-m w-100 mv1'}
        />
      </div>
    </div>
  );
};
