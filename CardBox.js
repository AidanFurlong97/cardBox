"use strict";

export const CardBox = (handlerContext) =>
  new GameStateMachine({
    steps: {
      StartHandler: new StartHandler(),
      DealHandler: new DealHandler(),
      GetUserDrawingHandler: new GetUserDrawingHandler(180_000),
      GetUserCaptionHandler: new GetUserCaptionHandler(60_000),
      PassStacksAroundHandler: new PassStacksAroundHandler(),
      GetUserScoresHandler: new GetUserScoresHandler(),
      EndHandler: new EndHandler(),
    },
    context: handlerContext,
  });
