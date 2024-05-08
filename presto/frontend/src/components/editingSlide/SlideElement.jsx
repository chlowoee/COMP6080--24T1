import React from 'react';
import TextElement from './TextElement';
import ImageElement from './ImageElement';
import VideoElement from './VideoElement';
import CodeElement from './CodeElement';
import TextDialog from './elementDialogs/TextDialog';
import ImgDialog from './elementDialogs/ImgDialog';
import VideoDialog from './elementDialogs/VideoDialog';
import CodeDialog from './elementDialogs/CodeDialog';
import { deleteElement } from '../../helper';

const elementTypes = {
  text: { ElementComponent: TextElement, DialogComponent: TextDialog },
  img: { ElementComponent: ImageElement, DialogComponent: ImgDialog },
  video: { ElementComponent: VideoElement, DialogComponent: VideoDialog },
  code: { ElementComponent: CodeElement, DialogComponent: CodeDialog },
};

/**
 * Handles slide element and functions including delete and edit
 * @param {*} param0
 * @returns Slide element
 */
export default function SlideElement ({ element, index, store, setStore, id, slideNum }) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDoubleClick = () => {
    if (Date.now() <= element.timeCreated + 2000) {
      setDialogOpen(true);
    }
  };

  const { ElementComponent, DialogComponent } = elementTypes[element.type];
  const edit = location.pathname.startsWith('/edit');

  return (
    <div key={index}>
      <div onDoubleClick={() => handleDoubleClick()}
        {...(edit && {
          onContextMenu: () =>
            deleteElement(store, setStore, id, slideNum, element)
        })}
      >
        <ElementComponent element={element}/>
      </div>
      <DialogComponent
        open={dialogOpen}
        setOpen={setDialogOpen}
        store={store}
        setStore={setStore}
        id={id}
        slideNum={slideNum}
        edit={true}
        elementId={element.id}
      />
    </div>
  );
}
