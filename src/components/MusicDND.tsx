import React, { Component } from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {audios, IAudio} from "../common/models";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import {IconButton} from "@mui/material/";

// fake data generator
const getItems = (count: number) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`
    }));

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '20px',
    // change background colour if dragging
    background: isDragging ? "lightgrey" : "white",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver:any) => ({
    background: isDraggingOver ? "#023162FF" : "lightgrey",
    padding: grid,
    width: 250,
    borderRadius: '20px',

});

const handlePlay = (url: any) => {
    let a = new Audio(url);
    a.play();
    setTimeout(() => {
        a.pause();
    } , 5000)
}

export class MusicDND extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            items: audios
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result:any) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            // @ts-ignore
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items
        });
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided: any, snapshot: any) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >

                            {// @ts-ignore
                                this.state.items.map((item: IAudio, index: number) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided: any, snapshot: any) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}

                                        >
                                            <b>{item.name}</b>
                                            <IconButton onClick={() => handlePlay(item.url)}  color="primary" aria-label="upload picture" component="span">
                                                <MusicNoteIcon />
                                            </IconButton>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default MusicDND
