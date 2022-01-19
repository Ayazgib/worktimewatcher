import React, {Component, useState} from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {audios, IactionsWithMusic, IAudio} from "../common/models";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import {IconButton} from "@mui/material/";
import {useDispatch, useSelector} from "react-redux";
import {reorderMusic} from "../redux/actions";


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
    background: isDragging ? "lightgrey" : "white",
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

export const MusicDND = () => {
    const state = useSelector((state:any) => state)
    const {musicActions} = state.settings

    const dispatch = useDispatch()


    const onDragEnd = (result:any) => {
        if (!result.destination) {
            return;
        }

        const newItems = reorder(
            // @ts-ignore
            musicActions,
            result.source.index,
            result.destination.index
        );
        dispatch(reorderMusic(newItems));
    }


        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided: any, snapshot: any) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >

                            {// @ts-ignore
                                musicActions.map((item: IactionsWithMusic, index: number) => (
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
                                            <b>{item.musicName}</b>
                                            <IconButton onClick={() => handlePlay(item.musicUrl)}  color="primary" aria-label="upload picture" component="span">
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

export default MusicDND
