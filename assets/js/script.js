let state = ''
let moveTo = ''
let results =[]


let move = (who='', direction) => { 
     if (who !== ''){ 
          $(`.${direction}-side`).find(`div.${who}`).find('img').show()
          $(`.${direction}-side`).find(`button.${who}`).prop("disabled", false)

          $(`.${direction==="left"?"right":"left"}-side`).find(`div.${who}`).find('img').hide()
          $(`.${direction==="left"?"right":"left"}-side`).find(`button.${who}`).prop("disabled", true)
     }

     $(`.man > .${direction}-side > div`).show()
     $(`.man > .${direction==="left"?"right":"left"}-side > div`).hide()
}

let isCompleted = async (state) => { 
     result = await fetch('/is-completed/'+state)
                    .then((respone) => respone.text())
                    .then((result) => { 
                         return (result === "False"?false:true) 
                    })
                    .catch((err) => console.log(err))
     return result
}
let isSafe = async (state) => { 
     result = await fetch('/is-safe/'+state)
                    .then((respone) => respone.text())
                    .then((result) => { 
                         return (result === "False"?false:true) 
                    })
                    .catch((err) => console.log(err))
     return result
}

let getSolution =async () => { 
     results = await fetch('/get-solution/'+state)
          .then((respone) => respone.text())
          .then((result) => { 
               return result
          })
          .catch((err) => console.log(err))
     results = (results==='-1')?-1:results.split(',')
}

$("#hint").click(async () => { 
     let result = ""
     
     if (results.length === 0){ 
          await getSolution()
     }
     if (results!=-1){ 
          if (results[0] !== state){ 
               await getSolution()
               results.shift()
          }
          else{ 
               results.shift()
          }
          result = results[0]

          const entities = ["Người", "Dê", "Sói", "Bắp cải"]
          let content = ''
          if (result.charAt(0) != state.charAt(0)){ 
               content += `<strong>${entities[0]}</strong>`
          }
          for (i=1; i<4; i++){ 
               if (result.charAt(i) != state.charAt(i)){ 
                    content += " chở " + `<strong>${entities[i]}</strong>`
                    break
               }
          }
          if (content != ''){ 
               if (result.charAt(0) === '1'){ 
                    content += " qua bờ sông bên <strong>trái</strong>."
               }
               else{ 
                    content += " qua bờ sông bên <strong>phải</strong>."
               }
          }
          $("#log").append(`<li class="list-group-item list-group-item-warning">${content}</li>`)
     }
     else{ 
          $("#log").append(`<li class="list-group-item list-group-item-warning">Không còn gì để gợi ý!</li>`)
     }

     $('#log').prop('scrollTop', $("#log").prop("scrollHeight"))
})

let leftSideActivate = async () => { 
     $(".selection.left-side").show()
     $(".man > .left-side > div").show()
     $(".man > .left-side > div > .selection").show()

     $(".selection.right-side").hide()
     $(".man > .right-side > div").hide()
     
}

let rightSideActivate = async () => { 
     $(".selection.right-side").show()
     $(".man > .right-side > div").show()
     $(".man > .right-side > div > .selection").show()

     $(".selection.left-side").hide()
     $(".man > .left-side > div").hide()
}

let completeGamePlay = async (cpu = false) => {
     $(".selection.right-side").hide()
     $(".selection.left-side").hide()
     $(".man > .left-side > div > .selection").hide()
     $(".man > .right-side > div > .selection").hide()
     $("#hint").prop("disabled", true)

     $("#log").append(`<li class="list-group-item list-group-item-success">${cpu?"Máy":"Bạn"} đã hoàn thành công việc!</li>`)
}

let deactivateGamePlay = async () => { 
     $(".selection.right-side").hide()
     $(".selection.left-side").hide()
     $(".man > .left-side > div > .selection").hide()
     $(".man > .right-side > div > .selection").hide()
     $("#hint").prop("disabled", true)

     $("#log").append(`<li class="list-group-item list-group-item-danger">Bạn không thể hoàn thành công việc!</li>`)
}

let initGamePlay = async () => { 
     state = '1111'

     $(".selection.left-side > button").each((index, e) => { 
          $(e).prop('disabled', false)
     })

     $(".selection.right-side > button").each((index, e) => { 
          $(e).prop('disabled', true)
     })

     $(".man > .left-side > div > .selection").show()

     $(".who.left-side").children("div.col").each((index, e) => { 
          $(e).find("img").show();
     })
     $(".who.right-side").children("div.col").each((index, e) => { 
          $(e).find("img").hide();
     })

     $(".right-side.selection > button").each((index, e) => {
          $(e).prop("disabled", true)
     })

     $('#log').html('')

     $("#hint").prop("disabled", false)

     await leftSideActivate()
}

$("#playerAttempt").click(async () => { 
     await initGamePlay()

     $("#log").append(`<li class="list-group-item list-group-item-primary">TRÒ CHƠI BẮT ĐẦU</li>`)
     $('#log').prop('scrollTop', $("#log").prop("scrollHeight"))
})

$("#CPUAttempt").click(async () => { 
     await initGamePlay()

     $(".selection.right-side").hide()
     $(".selection.left-side").hide()
     $(".man > .left-side > div > .selection").hide()
     $(".man > .right-side > div > .selection").hide()
     $("#hint").prop("disabled", true)

     $("#log").append(`<li class="list-group-item list-group-item-primary">TRÒ CHƠI BẮT ĐẦU</li>`)

     results = [] 
     await getSolution()

     let jsHello = (x,j) => {
          if (x >= j-2) return;
          setTimeout(async () => {
               let who = ''
               let direction = ''
               let result = results[x]

               const entities = ["Người", "Dê", "Sói", "Bắp cải"]
               let content = ''
               if (result.charAt(0) != state.charAt(0)){ 
                    content += `Máy chọn`
               }
               for (i=1; i<4; i++){ 
                    if (result.charAt(i) != state.charAt(i)){ 
                         content += " chở " + `<strong>${entities[i]}</strong>`
                         if (i==1){ 
                              who = "goat"
                         }
                         else if (i==2){ 
                              who = 'wolf'
                         }
                         else if (i==3){ 
                              who = 'cabbage'
                         }
                         break
                    }
               }
               if (content != ''){ 
                    if (result.charAt(0) === '1'){ 
                         content += " qua bờ sông bên <strong>trái</strong>."
                         direction = 'left'
                    }
                    else{ 
                         content += " qua bờ sông bên <strong>phải</strong>."
                         direction = 'right'
                    }
               }
               await move(who, direction)
               $("#log").append(`<li class="list-group-item list-group-item-secondary">${content}</li>`)
               $('#log').prop('scrollTop', $("#log").prop("scrollHeight"))

               state = result

               if (await isCompleted(state)){ 
                    await completeGamePlay(cpu = true)
               }
               jsHello(++x);

          }, 1000);
          
      }

     jsHello(1, results.length)     
})

//Move farmer alone
$("button.skip").click(async (e) => { 
     if ($(e.target).parent().parent().parent().hasClass("left-side")){
          //console.log("You skipped the left side!")
          moveTo = '2'

          await rightSideActivate()
     }
     else{
          //console.log("You skipped the right side!")
          moveTo = '1'

          await leftSideActivate()
     }

     state = state.substr(0, 0) + moveTo + state.substr(0 + moveTo.length)
     console.log(state)

     $("#log").append(`<li class="list-group-item">Bạn chọn qua bờ sông bên <strong>${moveTo==='1'?'trái':'phải'}</strongli>`)
     if (await isCompleted(state)){ 
          await completeGamePlay()
     }
     else if (!await isSafe(state)) {
          await deactivateGamePlay()
     }
     $('#log').prop('scrollTop', $("#log").prop("scrollHeight"))
})

$("button.goat").click(async (e) => {
     if ($(e.target).parent().hasClass("left-side")){ 
          //console.log("You choose the left goat!")
          moveTo = '2'

          $(".left-side").find('div.goat').find('img').hide()
          $(".left-side").find('button.goat').prop("disabled", true)

          $(".right-side").find('div.goat').find('img').show()
          $(".right-side").find('button.goat').prop("disabled", false)

          await rightSideActivate()
     }
     else{ 
          //console.log("You choose the right goat!")
          moveTo = '1'

          $(".right-side").find('div.goat').find('img').hide()
          $(".right-side").find('button.goat').prop("disabled", true)

          $(".left-side").find('div.goat').find('img').show()
          $(".left-side").find('button.goat').prop("disabled", false)

          await leftSideActivate()
     }
     //Move the man
     state = state.substr(0, 0) + moveTo + state.substr(0 + moveTo.length)

     //Move the goat
     state = state.substr(0, 1) + moveTo + state.substr(1 + moveTo.length)
     console.log(state)

     $("#log").append(`<li class="list-group-item">Bạn chọn chở <strong>Dê</strong> qua bờ sông bên <strong>${moveTo==='1'?'trái':'phải'}</strong></li>`)

     if (await isCompleted(state)){ 
          await completeGamePlay()
     }
     else if (!await isSafe(state)) {
          await deactivateGamePlay()
     }
     $('#log').prop('scrollTop', $("#log").prop("scrollHeight"))

     
     
})
$("button.wolf").click(async (e) => {
     if ($(e.target).parent().hasClass("left-side")){ 
          //console.log("You choose the left wolf!")
          moveTo = '2'

          $(".left-side").find('div.wolf').find('img').hide()
          $(".left-side").find('button.wolf').prop("disabled", true)

          $(".right-side").find('div.wolf').find('img').show()
          $(".right-side").find('button.wolf').prop("disabled", false)

          await rightSideActivate()
     }
     else{ 
          //console.log("You choose the right wolf!")
          moveTo = '1'

          $(".right-side").find('div.wolf').find('img').hide()
          $(".right-side").find('button.wolf').prop("disabled", true)

          $(".left-side").find('div.wolf').find('img').show()
          $(".left-side").find('button.wolf').prop("disabled", false)

          await leftSideActivate()
     }
     //Move the man
     state = state.substr(0, 0) + moveTo + state.substr(0 + moveTo.length)

     //Move the wolf
     state = state.substr(0, 2) + moveTo + state.substr(2 + moveTo.length)
     console.log(state)

     $("#log").append(`<li class="list-group-item">Bạn chọn chở <strong>Sói</strong> qua bờ sông bên <strong>${moveTo==='1'?'trái':'phải'}</strong></li>`)

     if (await isCompleted(state)){ 
          await completeGamePlay()
     }
     else if (!await isSafe(state)) {
          await deactivateGamePlay()
     }
     $('#log').prop('scrollTop', $("#log").prop("scrollHeight"))
})

$("button.cabbage").click(async (e) => {
     if ($(e.target).parent().hasClass("left-side")){ 
          //console.log("You choose the left cabbage!")
          moveTo = '2'

          $(".left-side").find('div.cabbage').find('img').hide()
          $(".left-side").find('button.cabbage').prop("disabled", true)

          $(".right-side").find('div.cabbage').find('img').show()
          $(".right-side").find('button.cabbage').prop("disabled", false)

          await rightSideActivate()
     }
     else{ 
          //console.log("You choose the right cabbage!")
          moveTo = '1'

          $(".right-side").find('div.cabbage').find('img').hide()
          $(".right-side").find('button.cabbage').prop("disabled", true)

          $(".left-side").find('div.cabbage').find('img').show()
          $(".left-side").find('button.cabbage').prop("disabled", false)

          await leftSideActivate()
     }

     //Move the man
     state = state.substr(0, 0) + moveTo + state.substr(0 + moveTo.length)

     //Move the cabbage
     state = state.substr(0, 3) + moveTo + state.substr(3 + moveTo.length)
     console.log(state)

     $("#log").append(`<li class="list-group-item">Bạn chọn chở <strong>Bắp cải</strong> qua bờ sông bên <strong>${moveTo==='1'?'trái':'phải'}</strong></li>`)

     if (await isCompleted(state)){ 
          await completeGamePlay()
     }
     else if (!await isSafe(state)) {
          await deactivateGamePlay()
     }
     $('#log').prop('scrollTop', $("#log").prop("scrollHeight"))
})