
/*
  the way transitions are implemented, we can't have two running at the same time. stageTransition stages transitions, executing the most
    recently staged transition once the current transition finishes. This prevents two transitions from executing at once, even if the user
    clicks two links right after another

  stageTransition acts as a one element queue for staging transitions

  transition: a function which executes a transition and takes exactly one argument, which is to be a callback the transition calls when it finishes
              this transition will be staged and, if it is the most recently staged, executed once the current transition finishes
              if no transition is currently running, this will run immediately

  return: returns the currently staged transition
*/
var next = null;

function stageTransition(transition){
   pushTransition(transition);
   executeTransition(false);
}

function pushTransition(transition){
   var hold = next;
   next = transition;
   return hold;
}

/*
  executeTransition pulls the currently staged transition and executes it, with a callback
  to itself, so it can execute the next transition once this once finishes

  executeTransition is never called while a transition is still running
*/
var running = false;
function executeTransition(finished){
  if(finished){
    running = false;
  }
  if(!running){
    var x = pushTransition(null);
    if(x !== null){
      running = true;
      x(function() { executeTransition(true) });
    }
  }
}

