$(document).ready(function() {

    var questionAnswer = [ //['Kliknij', 'Zaczynasz naukę'],
        ['question 1', 'answer 1'],
        ['question 2', 'answer 2'],
        ['question 3', 'answer 3']
    ];

    var reviewTable = [
        ['1', '1'],
        ['2', '2'],
        ['3', '3'],
        ['4', '4'],
    ];
    var flash = $('.card');
    var card = $('.flashcard').find('.front, .back');
    var questionInputs = $('.inputForm').find('input');
    var addQuestion = $('.inputForm').find('button'); //.find('#dodaj');
    console.log(questionAnswer.length)
    var j = 0;
    var handler = false;
    var disableRemove = false;
    var dontAddThis = true;

    $('.flashcard').find('.back').css('display', 'none');
    var cleanTable = function(array, q) {
        var lgt = array.length;

        var hold1 = array[q][0];
        var hold2 = array[q][1];
        for (var i = q; i < lgt; i++) {
            if (i + 1 < lgt) {
                array[q][0] = array[i + 1][0];
                array[q][1] = array[i + 1][1];
                q++
            } else {
                array[lgt - 1][0] = hold1;
                array[lgt - 1][1] = hold2;
                array.pop();
            }
        }
    }
    $('.btns').find('button').each(function(i) {
        $(this).on('click', function() {
            switch (i) {
                case 0:
                    if (handler == false) {
                        if (card.eq(0).text().trim() == 'Kliknij')
                            break;
                        console.log('dodano do powtorki');
                        reviewTable.push([$('.front').find('p').text(), $('.back').find('p').text()]);
                        console.log($('.front').find('p').text() + " " + $('.back').find('p').text());
                        break;
                    } else {
                        alert('To pytanie jest już w powtórce');
                        break;
                    }

                case 1:
                    if (handler == true) {
                        alert('Jestes właśnie w trybie powtórki');
                        break;
                    } else
                        handler = true;

                    console.log('zaczeto powtorke');
                    card.off();
                    flash.fadeOut('400', function() {
                      disableRemove=true;
                        card.eq(0).find('p').text('Kliknij');
                        card.eq(1).find('p').text('Zaczynasz powtórkę');
                        arrays(reviewTable);
                        flash.fadeIn('400');
                    });
                    break;

                  case 2:
        if(disableRemove==true){
          break;
        }
        if(handler == true)
          {
            if(reviewTable.length == 0)
            {
              alert('W powtorce nie ma nic do usuniecia');
              flash.fadeOut('400', function()
              {
                card.off(); //TO DODANE OSTATNIO MOzE BAGI MOZE NIE
                arrays(questionAnswer);
                card.eq(0).find('p').text('Brak pytan w powtorce');
                card.eq(1).find('p').text('Wracasz do domyslnego trybu');
                flash.fadeIn('400');
              });
              break;
            }
            else
            {

            console.log('Usunieto z powtorki');
            console.log(reviewTable[j][0]+" "+reviewTable[j][1]);
                reviewTable.splice(j,1);
                disableRemove = true;
                if(reviewTable.length != 0)
                {
                  card.off();
                  flash.fadeOut('400', function()
                  {
                    card.eq(0).find('p').text('pytanie usuniete');
                    card.eq(1).find('p').text('kliknij');
                    arrays(reviewTable);
                    flash.fadeIn('400');
                  });
              }
                else
                {
                  flash.fadeOut('400', function()
                  {
                    card.off();
                    handler=false;
                    arrays(questionAnswer);
                    card.eq(0).find('p').text('Brak pytan w powtorce');
                    card.eq(1).find('p').text('Wracasz do domyslnego trybu');
                    flash.fadeIn('400');
                  });
                }
            }
          }

        break;
                case 3:
                    if (handler == true) {
                        handler = false;
                        console.log('Skoncz powtorke');
                        card.off();
                        flash.fadeOut('400', function() {
                            card.eq(0).find('p').text('Kliknij');
                            card.eq(1).find('p').text('Wracasz do nauki');
                            arrays(questionAnswer);
                            flash.fadeIn('400');
                        });
                        break;
                    } else {
                        alert('Powtorka zostala juz zakonczona');
                        break;
                    }
            }
        });
    });


    var arrays = function(myArray) {

        j = -1;
        card.each(function(i) {
            $(this).on('click', {
                value: j
            }, function() {
                var arrayLength = myArray.length;
                switch (i) {
                    case 0:
                        flash.slideUp('400');
                        $(this).slideUp('400', function() {
                            card.eq(1).slideDown('400');
                            flash.slideDown('400');
                        });
                        break;

                    case 1:
                        flash.slideUp('400');
                        $(this).slideUp('400', function() {
                            card.eq(0).slideDown('400');
                            flash.slideDown('400');
                            card.eq(0).find('p').text(myArray[j][0]);
                            card.eq(1).find('p').text(myArray[j][1]);
                        });
                        j++;
                        disableRemove=false;
                        if (j == arrayLength)
                            j = 0;
                        console.log(j);
                        break;
                }
            });
        });
    }
    addQuestion.on('click', function() {
        console.log('ev dziala');
        if (questionInputs.eq(0).val().trim() != "" | questionInputs.eq(1).val().trim() != "") {
            var a = questionInputs.eq(0).val().trim();
            var b = questionInputs.eq(1).val().trim();
            questionAnswer.push([a, b]);
            console.log(questionInputs.eq(0).val().trim() + " " + questionInputs.eq(1).val().trim());
        }
    });
    flash.hide();
    var begin = $('.begin');
    begin.on('click', function() {
        $(this).fadeOut('400');
        flash.fadeIn('400');
    });
    arrays(questionAnswer);
});
