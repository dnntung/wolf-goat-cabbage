import sys

class WGC: 
     entities = ['man', 'goat', 'wolf', 'cabbage']

     def __init__(self, initialState): 
          self.initialState = [i for i in initialState]

     # Returns the state of the symbol who in the dictionary al. It
     # returns its value and not a reference to it so it can be used for
     # testing but not modified. If the symbol who is not part of the list
     # it return nil.
     def getState(self, who, currentState):
          return currentState[self.entities.index(who)]

     def setState(self, who, currentState, value):
          currentState[self.entities.index(who)] = value

     # Verifies if the state defined as an dictionary is safe. If the
     # goat is on the same side as the man, then we're safe. Otherwise if
     # the cabbage or the wolf is also on the other side, then we're not
     # safe.
     def isSafe(self, currentState):
          if self.getState('man', currentState) == self.getState('goat', currentState):
               return True
          if self.getState('goat', currentState) == self.getState('wolf', currentState):
               return False
          if self.getState('goat', currentState) == self.getState('cabbage', currentState):
               return False
          return True

     # Moves the entity from one side to the other in the sate al. It is a
     # list mutator. The positions of all the entities are defined by 0
     # and 1 so the move replaces the current position with 1 - it. It
     # returns the resulting list.
     def move(self, who, currentState):
          if self.getState(who, currentState) == 1:
               self.setState(who, currentState, 2)
          else:
               self.setState(who, currentState, 1)
          return currentState

     # Tests if the state has reached the goal. This is the case if all
     # four entities are on the other side.
     def isCompleted(self, currentState):
          return currentState == [2,2,2,2]

     # Checks if child is a safe state to move into, and if it is, it adds
     # it to the list of states.
     def isValidState(self, currentState, possibleStates):
          if self.isSafe(currentState):
               possibleStates.append(currentState)
          return possibleStates

     def getPossibleStates(self, currentState):
          possibleStates = []
          tempState = currentState[::]

          # the man can also move alone
          possibleStates = self.isValidState(self.move('man', tempState), possibleStates)

          for e in self.entities:
               # Move one object on the same side as the man
               if self.getState(e, currentState) == self.getState('man', currentState):
                    tempState = currentState[::]
                    self.move('man', tempState)
                    
                    self.isValidState(self.move(e, tempState), possibleStates)
          return possibleStates

     # Searches for a solution from the initial state
     def findSolution(self):
          result = [self.initialState]
          nextStage = self.initialState[::]

          while nextStage and not self.isCompleted(nextStage):
               possibleStates = self.getPossibleStates(nextStage)
               nextStage = []
               for state in possibleStates:
                    if not (state in result):
                         nextStage = state
                         result.append(nextStage)
                         break
          return result


c = WGC([int(i) for i in sys.argv[1].split(',')])
print(c.findSolution())

