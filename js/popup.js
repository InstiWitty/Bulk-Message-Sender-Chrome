"use strict";
document.addEventListener("DOMContentLoaded", async function () {
  function qa() {
    chrome.tabs.query({ active: !0, currentWindow: !0 }).then(async (a) => {
      let b = a[0].id;
      await chrome.tabs.sendMessage(
        b,
        { greeting: "hello" },
        async function (c) {
          c !== void 0 && c.number != null
            ? ((S = c.number),
              await chrome.identity.getProfileUserInfo(async function (d) {
                d
                  ? d.id
                    ? ((la = d.email), await ra(la, S))
                    : ($("#loadingScreen").hide(),
                      $("#unsynced").show(),
                      $("#synced").hide())
                  : ($("#reload").show(),
                    $("#reloadTab").click(() => {
                      chrome.tabs.reload(d);
                      window.close();
                    }),
                    $("#loadingScreen").hide());
              }))
            : ($("#reload").show(),
              $("#reloadTab").click(() => {
                chrome.tabs.reload(b);
                window.close();
              }),
              $("#loadingScreen").hide());
        }
      );
    });
  }
  async function ra(a, b) {
    var c = new Headers();
    c.append("Content-Type", "application/json");
    a = JSON.stringify({ email: a, phoneNumber: b });
    fetch("https://wamessager-backend.onrender.com/api/user/createUser", {
      method: "POST",
      headers: c,
      body: a,
      redirect: "follow",
    })
      .then((d) => d.json())
      .then(async (d) => {
        await chrome.storage.local.set({ phoneNumber: b });
        K = d.supportNumber;
        L = d.onboardingNumber || K;
        await sa();
        $("#defaultOpen").text(chrome.i18n.getMessage("tabHome"));
        $("#Collaborators").text(chrome.i18n.getMessage("tabTeam"));
        $("#Premium").text(chrome.i18n.getMessage("tabPremium"));
        $("#Tutorials").text(chrome.i18n.getMessage("tabTutorials"));
        $("#execlSheetBtnText").text(chrome.i18n.getMessage("uploadExcelBtn"));
        $("#downloadExcelTemplateText").text(
          chrome.i18n.getMessage("downloadTemplateBtn")
        );
        $("#filter_numbersText").text(chrome.i18n.getMessage("filterBtn"));
        $("#download_membersText").text(
          chrome.i18n.getMessage("downloadGroupBtn")
        );
        $("#options_divText").text(chrome.i18n.getMessage("options_divText"));
        $("#sheet_select_text").text(
          chrome.i18n.getMessage("sheet_select_text")
        );
        $("#excel_from_text").text(chrome.i18n.getMessage("excel_from_text"));
        $("#excel_to_text").text(chrome.i18n.getMessage("excel_to_text"));
        $("#for_formatting_text").text(
          chrome.i18n.getMessage("for_formatting_text")
        );
        $("#for_formatting_text2").text(
          chrome.i18n.getMessage("for_formatting_text")
        );
        T = chrome.i18n.getMessage("numberPlaceholder");
        ma = chrome.i18n.getMessage("numberPlaceholderDisabled");
        $("#sorted-number-filterText").text(
          chrome.i18n.getMessage("sortedNumberFilterText")
        );
        $("#DownloadGroupHeadingText").text(
          chrome.i18n.getMessage("downloadGroupHeadingText")
        );
        $("#exportGroupText").text(chrome.i18n.getMessage("exportGroupText"));
        $("#export-group").text(chrome.i18n.getMessage("exportGroup"));
        $("#selectAllGroupsText").text(
          chrome.i18n.getMessage("selectAllGroupsText")
        );
        $("#export-from-listText").text(
          chrome.i18n.getMessage("exportFromListText")
        );
        $("#export-list").text(chrome.i18n.getMessage("exportList"));
        $("#allChatsText").text(chrome.i18n.getMessage("allChatsText"));
        $("#unsavedChatsText").text(chrome.i18n.getMessage("unsavedChatsText"));
        $("#downloadGroupCloseBtnText").text(
          chrome.i18n.getMessage("downloadGroupCloseBtnText")
        );
        $("#clear").text(chrome.i18n.getMessage("clear"));
        $("#messageSettingsText").text(
          chrome.i18n.getMessage("messageSettingsText")
        );
        $("#send_attachmentsText").text(
          chrome.i18n.getMessage("send_attachmentsText")
        );
        $("#unsubscribe_optionText").text(
          chrome.i18n.getMessage("unsubscribe_optionText")
        );
        $("#addTimeStamp_optionTextCaption").html(
          chrome.i18n.getMessage("addTimeStamp_optionText")
        );
        $("#addTimeStamp_optionText").html(
          chrome.i18n.getMessage("addTimeStamp_optionText")
        );
        $("#custom_divText").text(chrome.i18n.getMessage("custom_divText"));
        $("#custom_divText_attachment").text(
          chrome.i18n.getMessage("custom_divText")
        );
        $("#timer-checkboxText").text(
          chrome.i18n.getMessage("timerCheckboxText")
        );
        $("#message-lineText").text(chrome.i18n.getMessage("msgLineText"));
        $("#message-overflow-text").text(
          chrome.i18n.getMessage("msgOverflowText")
        );
        $("#error-text").text(chrome.i18n.getMessage("errortext"));
        $("#addTemplateText").text(chrome.i18n.getMessage("addTemplateText"));
        $("#planInfoText").text(chrome.i18n.getMessage("planInfoText"));
        $("#supportFooter").text(chrome.i18n.getMessage("supportFooter"));
        $("#SupportTutorial").text(chrome.i18n.getMessage("supportFooter"));
        $("#pauseBtnText").text(chrome.i18n.getMessage("pauseBtnText"));
        $("#continueBtnText").text(chrome.i18n.getMessage("continueBtnText"));
        $("#stopBtnText").text(chrome.i18n.getMessage("stopBtnText"));
        $("#sendBtnText").text(chrome.i18n.getMessage("sendBtnText"));
        $("#reportBtnText").text(chrome.i18n.getMessage("reportBtnText"));
        $("#addMemberHeadingText").text(
          chrome.i18n.getMessage("addMemberHeadingText")
        );
        $("#addMemberBtnText").text(chrome.i18n.getMessage("addMemberBtnText"));
        $("#teamMemberNameText").text(
          chrome.i18n.getMessage("teamMemberNameText")
        );
        $("#teamMemberPhoneNumberText").text(
          chrome.i18n.getMessage("teamMemberPhoneNumberText")
        );
        $("#RemoveMemberText").text(chrome.i18n.getMessage("RemoveMemberText"));
        $("#getPremiumHeading").text(
          chrome.i18n.getMessage("getPremiumHeading")
        );
        $("#getPremium1").text(chrome.i18n.getMessage("getPremium1"));
        $("#getPremium2").text(chrome.i18n.getMessage("getPremium2"));
        $("#getPremium3").text(chrome.i18n.getMessage("getPremium3"));
        $("#getPremium4").text(chrome.i18n.getMessage("getPremium4"));
        $("#getPremium5").text(chrome.i18n.getMessage("getPremium5"));
        $("#getPremium6").text(chrome.i18n.getMessage("getPremium6"));
        $("#getPremium7").text(chrome.i18n.getMessage("getPremium7"));
        $("#getPremium8").text(chrome.i18n.getMessage("getPremium8"));
        $("#buypremium1").text(chrome.i18n.getMessage("tabPremium"));
        $(".premmium_feature").text(chrome.i18n.getMessage("premmium_feature"));
        $(".template_premmium_feature").text(
          chrome.i18n.getMessage("template_premmium_feature")
        );
        $("#firstMessageText").text(chrome.i18n.getMessage("firstMessageText"));
        $("#firstMessageReadyText").text(
          chrome.i18n.getMessage("firstMessageReadyText")
        );
        $("#onboardingMessage").html(
          chrome.i18n.getMessage("onboardingMessage")
        );
        $("#onboardingSendText").text(
          chrome.i18n.getMessage("onboardingSendText")
        );
        $(".chardinjs-tooltiptext").text(
          chrome.i18n.getMessage("onboardingSendIntro")
        );
        $("#syncMsgText").text(chrome.i18n.getMessage("syncMsgText"));
        $("#syncMessageNote").text(chrome.i18n.getMessage("syncMessageNote"));
        $("#uncheck_attachment").text(
          chrome.i18n.getMessage("uncheck_attachment")
        );
        $("#imageAttmntText").text(chrome.i18n.getMessage("imageAttmntText"));
        $("#docAttmntText").text(chrome.i18n.getMessage("docAttmntText"));
        $("#contactAttmntText").text(
          chrome.i18n.getMessage("contactAttmntText")
        );
        $("#timeGapText").text(chrome.i18n.getMessage("timeGapText"));
        $("#timeGapSeconds").text(chrome.i18n.getMessage("timeGapSeconds"));
        $("#timeGapRandomText").text(
          chrome.i18n.getMessage("timeGapRandomText")
        );
        $("#msgSentDisplayText").text(
          chrome.i18n.getMessage("msgSentDisplayText")
        );
        $("#addTeamMemberNote").text(
          chrome.i18n.getMessage("addTeamMemberNote")
        );
        $("#addMemberModalName").text(
          chrome.i18n.getMessage("teamMemberNameText")
        );
        $("#addMemberModalNumber").text(
          chrome.i18n.getMessage("teamMemberPhoneNumberText")
        );
        $("#addMemberAddBtnText").text(
          chrome.i18n.getMessage("addMemberAddBtnText")
        );
        $("#removeTeamMemberButton").text(
          chrome.i18n.getMessage("removeTeamMemberButton")
        );
        $("#memberName").attr(
          "placeholder",
          chrome.i18n.getMessage("addTeamMemberPlaceholder")
        );
        $("#memberPhone").attr(
          "placeholder",
          chrome.i18n.getMessage("addTeamMemberPhonePlaceholder")
        );
        $("#EnhancementSettings").text(
          chrome.i18n.getMessage("EnhancementSettings")
        );
        $("#blurToggleAllText").text(
          chrome.i18n.getMessage("blurToggleAllText")
        );
        $("#blurToggleAllText")
          .parent()
          .attr("title", chrome.i18n.getMessage("blurToggleAllTextTitle"));
        $("#blurAllMessageToggleText").text(
          chrome.i18n.getMessage("blurAllMessageToggleText")
        );
        $("#blurAllMessageToggleText")
          .parent()
          .attr(
            "title",
            chrome.i18n.getMessage("blurAllMessageToggleTextTitle")
          );
        $("#blurLastMesssageToggleText").text(
          chrome.i18n.getMessage("blurLastMesssageToggleText")
        );
        $("#blurLastMesssageToggleText")
          .parent()
          .attr(
            "title",
            chrome.i18n.getMessage("blurLastMesssageToggleTextTitle")
          );
        $("#blurMediaPreviewToggleText").text(
          chrome.i18n.getMessage("blurMediaPreviewToggleText")
        );
        $("#blurMediaPreviewToggleText")
          .parent()
          .attr(
            "title",
            chrome.i18n.getMessage("blurMediaPreviewToggleTextTitle")
          );
        $("#blurMediaGallaryToggleText").text(
          chrome.i18n.getMessage("blurMediaGallaryToggleText")
        );
        $("#blurMediaGallaryToggleText")
          .parent()
          .attr(
            "title",
            chrome.i18n.getMessage("blurMediaGallaryToggleTextTitle")
          );
        $("#blurTextInputToggleText").text(
          chrome.i18n.getMessage("blurTextInputToggleText")
        );
        $("#blurTextInputToggleText")
          .parent()
          .attr(
            "title",
            chrome.i18n.getMessage("blurTextInputToggleTextTitle")
          );
        $("#blurProfilePictureToggleText").text(
          chrome.i18n.getMessage("blurProfilePictureToggleText")
        );
        $("#blurProfilePictureToggleText")
          .parent()
          .attr(
            "title",
            chrome.i18n.getMessage("blurProfilePictureToggleTextTitle")
          );
        $("#blurGroupUserNameToggleText").text(
          chrome.i18n.getMessage("blurGroupUserNameToggleText")
        );
        $("#blurGroupUserNameToggleText")
          .parent()
          .attr(
            "title",
            chrome.i18n.getMessage("blurGroupUserNameToggleTextTitle")
          );
        $("#noTransitionDelayToggleText").text(
          chrome.i18n.getMessage("noTransitionDelayToggleText")
        );
        $("#noTransitionDelayToggleText")
          .parent()
          .attr(
            "title",
            chrome.i18n.getMessage("noTransitionDelayToggleTextTitle")
          );
        $("#unblurAllToggleText").text(
          chrome.i18n.getMessage("unblurAllToggleText")
        );
        $("#unblurAllToggleText")
          .parent()
          .attr("title", chrome.i18n.getMessage("unblurAllToggleTextTitle"));
        $("#reviewFooter").text(chrome.i18n.getMessage("reviewFooter"));
        $("#Enhancement").text(chrome.i18n.getMessage("Enhancement"));
        $("#attachmentAddButton").text(
          chrome.i18n.getMessage("attachmentAddButton")
        );
        $("#attachmentFileName").text(
          chrome.i18n.getMessage("attachmentFileName")
        );
        $("#attachmentFileType").text(
          chrome.i18n.getMessage("attachmentFileType")
        );
        $("#attachmentFileCaption").text(
          chrome.i18n.getMessage("attachmentFileCaption")
        );
        $("#attachmentFileAction").text(
          chrome.i18n.getMessage("attachmentFileAction")
        );
        $(".fileEdit").text(chrome.i18n.getMessage("attachmentEditAction"));
        $(".fileDelete").text(chrome.i18n.getMessage("attachmentDeleteAction"));
        $("#attachmentNote").text(chrome.i18n.getMessage("attachmentNote"));
        $("#file_input_help").text(chrome.i18n.getMessage("file_input_help"));
        $("#attachment_modal_file_name_text").text(
          chrome.i18n.getMessage("attachment_modal_file_name_text")
        );
        $("#attachment_modal_file_type_text").text(
          chrome.i18n.getMessage("attachment_modal_file_type_text")
        );
        $("#attachment_caption").text(
          chrome.i18n.getMessage("attachment_caption")
        );
        $("#attachment_modal_file_caption").attr(
          "placeholder",
          chrome.i18n.getMessage("attachment_modal_file_caption_placeholder")
        );
        $("#attachment_modal_submit").text(
          chrome.i18n.getMessage("attachment_modal_submit")
        );
        $("#msg_preview_text").text(chrome.i18n.getMessage("msg_preview_text"));
      })
      .catch((d) => {
        console.log(d);
        $("#loadingScreenLoader").hide();
        $("#loadingScreenErrorMessage").css("display", "flex");
      });
  }
  async function U() {
    function a(e, g, n, y) {
      chrome.tabs.query({ active: !0, currentWindow: !0 }).then((M) => {
        chrome.tabs.sendMessage(M[0].id, {
          context: {
            download_group: "true",
            exportType: e,
            groupIds: g,
            isAllGroupSelected: n,
            listOption: y,
            groupList,
            chatList,
            labelList,
          },
        });
      });
    }
    let b = await l("phoneNumber");
    var c = {
        url: `${"https://wamessager-backend.onrender.com"}/api/user/getUser?phoneNumber=${
          b.phoneNumber
        }`,
        method: "GET",
        timeout: 0,
      },
      d = chrome.runtime.getManifest();
    $("#myNumber").text("+" + b.phoneNumber);
    $("#myNumber2").text("+" + b.phoneNumber);
    $("#activationNumber").text("+" + b.phoneNumber);
    $("#myVersion").show();
    $("#myVersion").text("V~" + d.version);
    $.ajax(c)
      .done(async function (e) {
        if (e.success) {
          $("#loadingScreen").hide();
          $("#onboarding,#unsynced").hide();
          $("#synced").show();
          m = e.user;
          p = e.isPremium;
          var g = m.planhistory[m.planhistory.length - 1],
            n = m.collaborators;
          e.parentPhoneNumber &&
            ($("#adminNumber").show(),
            $("#adminNumber").html(
              chrome.i18n.getMessage("adminNumber", [e.parentPhoneNumber])
            ));
          if (p) {
            e = new Date(e.planEndDate) - new Date();
            e = Math.ceil(e / 864e5);
            let y =
              '<b> PREMIUM</b> <a href="https://billing.stripe.com/p/login/4gw1791Rggir99edQQ" target="_blank" style="color: blue;">Manage Plan</a>';
            y =
              e > 3
                ? y + ("<br> Days Remaining: " + e)
                : y +
                  ('<br><span style="color:red"><b> Days Remaining: ' +
                    e +
                    "</b></span>");
            $("#messageCountDiv").css("font-size", "20px");
            $("#premiumUser").show();
            $("#nonPremiumUser").hide();
            $("#enter_code_div").hide();
            $("#planInfo").html(y);
            $("#messageCount").html(`<strong>${m.messagesSent}</strong>`);
            $("#dailyLimitDiv").hide();
            $("#extMessageCount").text(
              chrome.i18n.getMessage("extMessageCount")
            );
          } else
            (B = m.freeMsgLimit != void 0 ? m.freeMsgLimit : v),
              $("#Premium").css(
                "animation",
                "horizontal-shaking 1s 5s infinite"
              ),
              $("#extMessageCount").text(
                chrome.i18n.getMessage("extMessageCountDailyCount")
              ),
              $("#dailyMsgReset").text(chrome.i18n.getMessage("dailyMsgReset")),
              (await l("DAILY_MSG_LEFT")).DAILY_MSG_LEFT == void 0 ||
              (await l("DAILY_MSG_LEFT")).DAILY_MSG_LEFT > B
                ? await h({ DAILY_MSG_LEFT: B })
                : (v = (await l("DAILY_MSG_LEFT")).DAILY_MSG_LEFT),
              v == B && (await h({ DAILY_MSG_LATEST_TIMESTAMP: E })),
              (await l("DAILY_MSG_LATEST_TIMESTAMP"))
                .DAILY_MSG_LATEST_TIMESTAMP == void 0
                ? await h({ DAILY_MSG_LATEST_TIMESTAMP: E })
                : (E = (await l("DAILY_MSG_LATEST_TIMESTAMP"))
                    .DAILY_MSG_LATEST_TIMESTAMP),
              (e = (Date.now() - E) / 36e5),
              (e = 24 - e),
              e <= 0
                ? ((E = Date.now()),
                  (v = B),
                  await h({ DAILY_MSG_LEFT: B }),
                  await h({ DAILY_MSG_LATEST_TIMESTAMP: E }),
                  $("#dailyMsgResetTime").text("24 Hrs"))
                : v == B
                ? $("#dailyMsgResetTime").text("24 Hrs")
                : e > 1
                ? $("#dailyMsgResetTime").text(
                    Math.floor(e) + " hr " + Math.floor((e * 60) % 60) + " min"
                  )
                : $("#dailyMsgResetTime").text(Math.ceil(e * 60) + " min"),
              $("#messageCount").html(`<strong>${v}</strong>`),
              setTimeout(() => {
                ta();
              }, 1e4),
              $("#input").attr("disabled", !0),
              $("#input")
                .parent()
                .closest("label")
                .removeClass("bg-green-700 hover:bg-green-900"),
              $("#input").parent().closest("label").addClass("bg-gray-700"),
              $("#input")
                .parent()
                .closest("label")
                .attr(
                  "title",
                  "This is a premium feature, subscribe to plan to use this"
                ),
              $("#uploadExcelPremiumBadge").css("display", ""),
              $("#download_members").attr("disabled", !0),
              $("#download_members").removeClass(
                "bg-green-700 hover:bg-green-900"
              ),
              $("#download_members").addClass("bg-gray-700"),
              $("#download_members").attr(
                "title",
                "This is a premium feature, subscribe to plan to use this"
              ),
              $("#DownloadGroupPremiumBadge").css("display", "");
          await h({ mainUser: m });
          g = g.usageQuantityAllowed[0];
          n = n?.length ? n.length : 0;
          n != 0 ? $("#noteamMember").hide() : $("#noteamMember").show();
          $("#memberCount").html(chrome.i18n.getMessage("memberCount", [n, g]));
          p
            ? g == 0
              ? ($("#noteamMember").text("Upgrade plan to add team members"),
                $("#addMember").attr("disabled", !0))
              : n >= g && $("#addMember").attr("disabled", !0)
            : ($("#noteamMember").text("Buy Premium to add team members"),
              $("#addMember").attr("disabled", !0));
          ua(m);
        } else $("#loadingScreenLoader").hide(), $("#loadingScreenErrorMessage").css("display", "flex");
      })
      .catch(() => {
        $("#loadingScreenLoader").hide();
        $("#loadingScreenErrorMessage").css("display", "flex");
      });
    $("#number").attr("placeholder", T);
    $("#number").tokenfield({ inputType: "tel", createTokensOnBlur: !0 });
    let f = navigator.userAgent.toLowerCase().includes("mac");
    chrome.windows.getCurrent().then((e) => {
      e.state === "fullscreen" &&
        f &&
        chrome.windows.update(e.id, { state: "normal" });
    });
    N = $('input[name="chatListOptions"]:checked').val();
    $("#selectAllGroups").change(function () {
      this.checked
        ? (groupSelector.removeActiveItems(),
          (F = !0),
          $("#export-group").attr("disabled", !1))
        : ((F = !1), $("#export-group").attr("disabled", !0));
    });
    $("#export-group").click(function () {
      O = groupSelector.getValue().map((e) => e.value);
      (O.length > 0 || F) && a($("#choices-for-export").val(), O, F, N);
    });
    $("#export-list").click(function () {
      a("Chat", O, F, N);
    });
    $('input[name="chatListOptions"]').change(function () {
      N = $('input[name="chatListOptions"]:checked').val();
    });
    $("#download_members").click(function () {});
  }
  function ua(a) {
    let b = a.collaborators?.length ? a.collaborators : [],
      c = a.planhistory[a.planhistory.length - 1].usageQuantityAllowed[0],
      d = b.length;
    b.map((f, e) => {
      if (f.phoneNumber) {
        let g = $(".teamMember").eq(0).clone();
        g.prop("id", f.phoneNumber).removeClass("hidden");
        g.find(".memberName").text(f.name);
        g.find(".memberNumber").text(f.phoneNumber);
        g.find(".removeMember").on("click", async () => {
          $(`#${f.phoneNumber}`).remove();
          const n = b.indexOf(b[e]);
          n > -1 && (b.splice(n, 1), (a.collaborators = b), h({ mainUser: a }));
          --d;
          $("#memberCount").html(chrome.i18n.getMessage("memberCount", [d, c]));
          d == 0 && $("#noteamMember").show();
          V("REMOVE", f.phoneNumber, "");
          $("#addMember").removeAttr("disabled");
        });
        $("#memberTable").append(g);
      }
    });
  }
  function P(a, b) {
    var c;
    var d = document.getElementsByClassName("tabcontent");
    for (c = 0; c < d.length; c++) d[c].style.display = "none";
    d = document.getElementsByClassName("tablinks");
    for (c = 0; c < d.length; c++)
      d[c].className = d[c].className.replace(" active", "");
    document.getElementById(b).style.display = "block";
    a.currentTarget.className += " active";
  }
  function W(a, b) {
    $("#number-tokenfield").attr("placeholder", ma);
    $("#number").tokenfield("disable");
    $("#personalizedVariable").text("Select Variable");
    $("#personalizedVariable_attachment").text("Select Variable");
    for (const [e, g] of Object.entries(a.SheetNames)) {
      var c = document.getElementById("options2"),
        d = document.createElement("option");
      d.name = "..";
      d.value = e;
      d.innerText = g;
      c.appendChild(d);
      c.style.display = "";
    }
    $("#options2").val(b);
    w = XLSX.utils.sheet_to_json(a.Sheets[a.SheetNames[b]], { header: "A" });
    q = 2;
    r = w.length;
    chrome.storage.local.set({ sheets_json: a });
    chrome.storage.local.set({ contacts: w });
    chrome.storage.local.set({ from_column: q });
    chrome.storage.local.set({ to_column: r });
    $("#enter-excel-from").val(q);
    $("#enter-excel-to").val(r);
    $("#contacts-found").text(
      chrome.i18n.getMessage("contactFoundText", [r - q + 1])
    );
    $("#contacts-found").css("display", "flex");
    $("#send").attr("disabled", !1);
    for (const [e, g] of Object.entries(w[0])) {
      a = document.getElementById("options");
      c = document.getElementById("token");
      d = document.getElementById("token_attachment");
      var f = document.createElement("option");
      f.name = "..";
      f.value = e;
      f.innerText = g;
      let n = f.cloneNode(!0),
        y = f.cloneNode(!0);
      a.appendChild(f);
      c.appendChild(n);
      d.appendChild(y);
      a.style.display = "";
    }
    chrome.storage.local.set({ sheetNumber: b });
    $("#options_div").css("display", "block");
    $("#options_div1").css("display", "block");
    $("#options_div2").css("display", "block");
    $("#options_div3").css("display", "block");
    $("#deleteExecl").css("display", "block");
    $("#filter_numbers").parent().parent().show();
    $("#downloadExcelTemplate").css("display", "none");
    document.getElementById("execlSheetBtn").parentElement.style.display =
      "none";
  }
  function na() {
    chrome.storage.local.remove(["contacts", "sheets_json"]);
    let a = document.getElementById("options").lastElementChild;
    for (; a; )
      document.getElementById("options").removeChild(a),
        (a = document.getElementById("options").lastElementChild);
    for (a = document.getElementById("options2").lastElementChild; a; )
      document.getElementById("options2").removeChild(a),
        (a = document.getElementById("options2").lastElementChild);
    w = {};
    $("#contacts-found").text(chrome.i18n.getMessage("contactFoundText", [0]));
    $("#send").attr("disabled", !0);
    a = document.getElementById("token").lastElementChild;
    let b = document.getElementById("token").firstElementChild.cloneNode(!0);
    for (; a; )
      document.getElementById("token").removeChild(a),
        (a = document.getElementById("token").lastElementChild);
    document.getElementById("token").appendChild(b);
    a = document.getElementById("token_attachment").lastElementChild;
    for (
      b = document
        .getElementById("token_attachment")
        .firstElementChild.cloneNode(!0);
      a;

    )
      document.getElementById("token_attachment").removeChild(a),
        (a = document.getElementById("token_attachment").lastElementChild);
    document.getElementById("token_attachment").appendChild(b);
    $("#options_div").css("display", "none");
    $("#options_div1").css("display", "none");
    $("#options_div2").css("display", "none");
    $("#options_div3").css("display", "none");
    $("#deleteExecl").css("display", "none");
    $("#filter_numbers").parent().parent().hide();
    document.getElementById("execlSheetBtn").parentElement.style.display =
      "flex";
    $("#downloadExcelTemplate").css("display", "flex");
    $("#is_custom_message").is(":checked") && $("#is_custom_message").click();
    $("#personalizedVariable").text(chrome.i18n.getMessage("uploadExcelBtn"));
    $("#personalizedVariable_attachment").text(
      chrome.i18n.getMessage("uploadExcelBtn")
    );
    $("#number-tokenfield").attr("placeholder", T);
    $("#number").tokenfield("enable");
    $("#sheet_number").attr("disabled", !1);
    $("#verifyGoogleSheet").attr("disabled", !1);
    $("#verifyGoogleSheet").addClass(
      "bg-green-700 hover:bg-green-900 cursor-pointer text-white font-bold py-2 px-4 rounded h-100 mr-5 inline-flex items-center"
    );
    chrome.storage.local.remove("numberColumn");
    chrome.storage.local.remove("sheetNumber");
  }
  async function X() {
    let a = await l("attachment_data");
    a &&
      a.attachment_data &&
      ((a = a.attachment_data),
      a.length > 6
        ? ($("#add_attachment_button").attr("disabled", "disabled"),
          $("#add_attachment_button").addClass(" cursor-not-allowed"))
        : ($("#add_attachment_button").removeAttr("disabled"),
          $("#add_attachment_button").removeClass(" cursor-not-allowed")),
      $("#attachmentBody").empty(),
      a.forEach((b) => {
        let c = $("#sample-attachment-data").clone();
        c.prop("id", b.fileName);
        b.fileName.length > 20
          ? c.find(".fileName").text(b.fileName.slice(0, 17) + "...")
          : c.find(".fileName").text(b.fileName);
        b.fileType.length > 20
          ? c.find(".fileType").text(b.fileType.slice(0, 17) + "...")
          : c.find(".fileType").text(b.fileType);
        b.fileCaption.length > 16
          ? c.find(".fileCaption").text(b.fileCaption.slice(0, 13) + "...")
          : c.find(".fileCaption").text(b.fileCaption);
        c.removeClass("hidden");
        c.find(".fileEdit").click(() => {
          $("#attachmentModalTitle").text(
            chrome.i18n.getMessage("attachmentModalTitle_edit")
          );
          $("#formFileSm").hide();
          $("#file_input_help").hide();
          $("#attachment_modal_file_name").text(b.fileName);
          $("#attachment_modal_file_type").text(b.fileType);
          $("#addTimeStamp_optionCaption").prop(
            "checked",
            typeof b.fileAddTimeStamp === "undefined" ? !0 : b.fileAddTimeStamp
          );
          document.getElementById("attachment_modal_file_caption").value =
            b.fileCaption;
          G.show();
          H = b.fileName;
          b.fileType.split("/")[0] == "image" ||
          b.fileType.split("/")[0] == "video"
            ? ($("#attachment_caption_area").show(),
              $("#addTimeStampCaption").show())
            : ((document.getElementById("attachment_modal_file_caption").value =
                ""),
              $("#attachment_caption_area").hide(),
              $("#addTimeStampCaption").hide());
        });
        c.find(".fileDelete").click(async () => {
          a = a.filter((d) => d.fileName != b.fileName);
          await h({ attachment_data: a });
          X();
        });
        $("#attachmentBody").append(c);
      }));
  }
  function va(a) {
    return new Promise((b, c) => {
      const d = new FileReader();
      d.readAsDataURL(a);
      d.onload = () => b(d.result);
      d.onerror = (f) => c(f);
    });
  }
  async function wa(a) {
    if (!a) return !1;
    let b = !0;
    a.size > 16e6 &&
      (alert(
        chrome.i18n.getMessage("fileSizeAlert", [
          a.name,
          Math.ceil(a.size / 1048576),
        ])
      ),
      $("#formFileSm").val(""),
      (b = !1));
    let c = await l("attachment_data");
    c = c.attachment_data || [];
    c.forEach((d) => {
      d.fileName == a.name &&
        ((b = !1),
        alert(chrome.i18n.getMessage("fileDuplicateAlert", a.name)),
        $("#formFileSm").val(""));
    });
    return b;
  }
  function oa(a, b, c) {
    iziToast.error({
      title: chrome.i18n.getMessage("iziToastExcelSizeError"),
      message: a,
      displayMode: 0,
      position: b,
      buttons: [
        [
          "<button>Okay</button>",
          function (d, f) {
            c();
            d.hide({ transitionOut: "fadeOut" }, f, "button");
          },
        ],
        [
          "<button>Upgrade Plan</button>",
          async function (d, f) {
            c();
            d.hide({ transitionOut: "fadeOut" }, f, "button");
            window.open("https://wamessager.com/pricing", "_blank");
          },
          !0,
        ],
      ],
      onClosing: function () {},
      onClosed: function () {},
    });
  }
  function A() {
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (a) {
      a.length !== 0 &&
        a.forEach(function (b) {
          chrome.scripting.executeScript({
            target: { tabId: b.id },
            files: ["js/load.js"],
          });
        });
    });
  }
  async function V(a, b, c) {
    var d = new Headers();
    d.append("Content-Type", "application/json");
    let f = await l("phoneNumber");
    a = JSON.stringify({
      mainPhoneNumber: f.phoneNumber,
      collaboratorName: c,
      collaboratorPhoneNumber: b,
      type: a,
    });
    fetch("https://wamessager-backend.onrender.com/api/user/addCollaborator", {
      method: "POST",
      headers: d,
      body: a,
      redirect: "follow",
    }).then((e) => {
      if (e.status == 200) return !0;
    });
  }
  async function sa() {
    let a = await chrome.storage.local.get("onBoarding");
    a != void 0 && a.onBoarding
      ? (U(), $("#defaultOpen").click())
      : (L == void 0 && (L = "919356745862"),
        $("#onboardingNumber").val(L),
        $("#loadingScreen").hide(),
        $("#onboarding").show(),
        $("body").chardinJs("start"));
  }
  var S,
    la,
    O = [],
    F = !0,
    N,
    T,
    ma;
  let x,
    p = !1;
  var K, L, m;
  let t = 1,
    u = 1,
    q = 1,
    r = 1;
  var Y,
    w = {},
    xa = document.getElementById("send"),
    Q = [],
    D = !1,
    I = !1,
    R = !1,
    J = {},
    pa,
    k = {
      state: "STOP",
      operation: "",
      msgCount: "",
      msgSent: "",
      msgTotal: "",
    },
    v = 50,
    B,
    E = Date.now();
  await chrome.tabs.query(
    { url: "https://web.whatsapp.com/*", currentWindow: !0 },
    function (a) {
      0 < a.length
        ? ((pa = a[0].id),
          chrome.tabs.update(pa, { active: !0, highlighted: !0 }))
        : chrome.tabs.create({ url: "https://web.whatsapp.com/" });
      qa();
    }
  );
  $("textarea#message").on("change", function () {
    let a = document.querySelector("textarea#message").value;
    $("#template-dropdown").selectpicker("val", "default");
    $("#deleteTemplate").css("display", "none");
    chrome.storage.local.set({ text: a }, function () {});
  });
  $("#defaultOpen").click(function (a) {
    P(a, "SendMessages");
  });
  $("#Premium").click(function (a) {
    P(a, "GetPremium");
  });
  $("#buypremium,#premium2,#top_premium,#buypremium1").click(function () {
    window.open("https://wamessager.com/pricing");
  });
  $("#Collaborators").click(function (a) {
    P(a, "collaboratorsTab");
  });
  $("#Enhancement").click(function (a) {
    P(a, "EnhancementTab");
  });
  $("#execlSheetBtn").on("change", function (a) {
    if (p && (Y = a.target.files[0]))
      if (Math.round(Y.size / 1048576) > 5)
        iziToast.error({
          title: chrome.i18n.getMessage("iziToastExcelSizeError"),
          message: chrome.i18n.getMessage("iziToastExcelSizeErrorMsg"),
          displayMode: 0,
          position: "topRight",
        });
      else {
        var b = new FileReader();
        b.onload = function (c) {
          c = new Uint8Array(c.target.result);
          J = XLSX.read(c, { type: "array", raw: !0 });
          W(J, 0);
          for (const [d, f] of Object.entries(w[1]))
            if (f.toString().replace(/\D/g, "").replace(/^0+/, "").length > 4) {
              $("#options").val(d);
              break;
            }
          chrome.storage.local.set({ numberColumn: $("#options").val() });
        };
        b.readAsArrayBuffer(Y);
        a.target.value = "";
      }
  });
  $("#options").change(() => {
    chrome.storage.local.set({ numberColumn: $("#options").val() });
  });
  $("#enter-excel-from").change((a) => {
    a.target.value < 2 && (a.target.value = 2);
    a.target.value = parseInt(a.target.value);
    r = parseInt(r);
    a.target.value > r && (a.target.value = r);
    q = parseInt(a.target.value);
    chrome.storage.local.set({ from_column: q });
    $("#contacts-found").text(
      chrome.i18n.getMessage("contactFoundText", [r - q + 1])
    );
  });
  $("#enter-excel-to").change((a) => {
    a.target.value > w.length && (a.target.value = w.length);
    a.target.value = parseInt(a.target.value);
    q = parseInt(q);
    a.target.value < q && (a.target.value = q);
    r = parseInt(a.target.value);
    chrome.storage.local.set({ to_column: r });
    $("#contacts-found").text(
      chrome.i18n.getMessage("contactFoundText", [r - q + 1])
    );
  });
  $("#options2").change(() => {
    let a = $("#options2").val();
    na();
    W(J, a);
  });
  $("#deleteExecl").click(na);
  $("#downloadExcelTemplate").on("click", () => {
    x = { downloadExcelTemplate: !0 };
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (a) {
      chrome.tabs.sendMessage(a[0].id, { context: x }, function () {});
    });
  });
  $("#filter_numbers").on("click", function () {
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (a) {
      var b = a[0],
        c = [],
        d = $("#options").find(":selected").val();
      k = { ...k, state: "SEND", operation: "FILTER" };
      chrome.storage.local.set({ currentState: k }, () => {
        $("#send").css("display", "none");
        $("#stop").css("display", "");
        $("#pause").css("display", "");
        $("#continue").css("display", "none");
        $("#export_results").css("display", "none");
        $("#filter_numbers").attr("disabled", "disabled");
        let f = [w[0], ...w.slice(q - 1, r)];
        for (var e = 1; e < f.length; e++) {
          var g = f[e][d];
          g == void 0 || g == null ? c.push("") : c.push(g);
        }
        chrome.tabs.sendMessage(b.id, {
          context: { filter_numbers: "true" },
          arr: c,
        });
      });
    });
  });
  $("#number").on("change", function () {
    let a = document.querySelector("input#number").value;
    if (a.length > 0) {
      $("#sheet_number").attr("disabled", !0);
      p &&
        ($("#input").attr("disabled", !0),
        $("#input")
          .parent()
          .closest("label")
          .removeClass("bg-green-700 hover:bg-green-900"),
        $("#input").parent().closest("label").addClass("bg-gray-700"),
        $("#input")
          .parent()
          .closest("label")
          .attr("title", "Delete numbers from below to upload excel sheet"));
      $("#downloadExcelTemplate").attr("disabled", !0);
      $("#deleteExcelTemplate").attr("disabled", !0);
      let b = a.replace(/[^\d,]/g, "");
      b = b.split(",");
      b = b.filter((c) => c);
      $("#contacts-found").text(
        chrome.i18n.getMessage("contactFoundText", [b.length])
      );
      $("#contacts-found").css("display", "flex");
      $("#send").attr("disabled", !1);
    } else $("#sheet_number").attr("disabled", !1), p && ($("#input").attr("disabled", !1), $("#input").parent().closest("label").attr("title", ""), $("#input").parent().closest("label").addClass("bg-green-700 hover:bg-green-900 cursor-pointer text-white font-bold py-2 px-4 rounded h-100 mr-5 inline-flex items-center")), $("#downloadExcelTemplate").removeAttr("disabled"), $("#contacts-found").text(chrome.i18n.getMessage("contactFoundText", [0])), $("#send").attr("disabled", !0);
    chrome.storage.local.set({ numbersList: a }, function () {});
  });
  $("#clear").click(function () {
    document.querySelector("input#number").value != "" &&
      ((document.querySelector("input#number").value = ""),
      $("input#number").tokenfield("setTokens", []),
      $("#sheet_number").attr("disabled", !1),
      p &&
        ($("#input").attr("disabled", !1),
        $("#input").parent().closest("label").attr("title", ""),
        $("#input")
          .parent()
          .closest("label")
          .addClass(
            "bg-green-700 hover:bg-green-900 cursor-pointer text-white font-bold py-2 px-4 rounded h-100 mr-5 inline-flex items-center"
          )),
      $("#downloadExcelTemplate").removeAttr("disabled"),
      $("#contacts-found").text(
        chrome.i18n.getMessage("contactFoundText", [0])
      ),
      $("#send").attr("disabled", !0),
      chrome.storage.local.set({ numbersList: "" }, function () {}));
  });
  $("#send_attachments").change(function () {
    (D = $("#send_attachments").is(":checked"))
      ? ((document.getElementById("steps_for_attachments").style.display =
          "flex"),
        $("#add_attachment_button").removeClass("hidden"))
      : ((document.getElementById("steps_for_attachments").style.display =
          "none"),
        $("#add_attachment_button").addClass("hidden"));
  });
  let G = new Modal(document.getElementById("small-modal")),
    H;
  $("#add_attachment_button").click(function () {
    $("#attachmentModalTitle").text(
      chrome.i18n.getMessage("attachmentModalTitle_add")
    );
    G.show();
    $("#formFileSm").show();
    $("#file_input_help").show();
  });
  $("#attachment_close_button").click(() => {
    H = null;
    $("#attachment_caption_area").hide();
    $("#addTimeStampCaption").hide();
    $("#formFileSm").val("");
    $("#attachment_modal_file_name").text("");
    $("#attachment_modal_file_type").text("");
    document.getElementById("attachment_modal_file_caption").value = "";
    G.hide();
  });
  $("#formFileSm").change(async function () {
    const a = $(this).get(0).files[0];
    (await wa(a))
      ? ($("#attachment_modal_file_name").text(a.name),
        $("#attachment_modal_file_type").text(a.type),
        a.type.split("/")[0] == "image" || a.type.split("/")[0] == "video"
          ? ($("#attachment_caption_area").show(),
            $("#addTimeStampCaption").show())
          : ((document.getElementById("attachment_modal_file_caption").value =
              ""),
            $("#attachment_caption_area").hide(),
            $("#addTimeStampCaption").hide()))
      : ($("#attachment_modal_file_name").text(""),
        $("#attachment_modal_file_type").text(""));
  });
  $("#attachment_modal_submit").click(async () => {
    let a = await l("attachment_data");
    a = a.attachment_data || [];
    if (H)
      for (var b = 0; b < a.length; b++) {
        if (a[b].fileName === H) {
          a[b].fileCaption = document.getElementById(
            "attachment_modal_file_caption"
          ).value;
          a[b].fileAddTimeStamp = $("#addTimeStamp_optionCaption").is(
            ":checked"
          );
          await h({ attachment_data: a });
          break;
        }
      }
    else {
      let c = document.getElementById("formFileSm").files[0];
      if (!c) {
        alert(chrome.i18n.getMessage("fileEmptyAlert"));
        G.hide();
        return;
      }
      b = await new Promise((d) => {
        va(c).then((f) => {
          let e = {};
          e.fileName = c.name;
          e.fileType = c.type;
          e.fileData = JSON.stringify(f);
          e.fileCaption = document.getElementById(
            "attachment_modal_file_caption"
          ).value;
          e.fileType.split("/")[0] == "image" ||
          e.fileType.split("/")[0] == "video"
            ? (e.fileAddTimeStamp = $("#addTimeStamp_optionCaption").is(
                ":checked"
              ))
            : (e.fileAddTimeStamp = !1);
          d(e);
        });
      });
      a.push(b);
      await h({ attachment_data: a });
    }
    H = null;
    $("#attachment_caption_area").hide();
    $("#addTimeStampCaption").hide();
    $("#formFileSm").val("");
    $("#attachment_modal_file_name").text("");
    $("#attachment_modal_file_type").text("");
    document.getElementById("attachment_modal_file_caption").value = "";
    X();
    G.hide();
  });
  $("#unsubscribe_option").click(function () {
    $("#unsubscribe_option").is(":checked") &&
      (document.querySelector("#message").value +=
        "\nYou can unsubscribe to future messages by replying UNSUBSCRIBE here.");
  });
  $("#unsubscribe_option").change(function () {
    I = !!$(this).is(":checked");
  });
  $("#is_custom_message").change(function () {
    $(this).is(":checked")
      ? ((R = !0), (document.getElementById("token").style.display = ""))
      : ((R = !1), (document.getElementById("token").style.display = "none"));
  });
  $("#token").change(function () {
    if ($("#token").find(":selected").attr("disabled") === void 0) {
      var a = $("#message").prop("selectionStart"),
        b = $("#message").val(),
        c = b.substring(0, a);
      a = b.substring(a, b.length);
      $("#message").val(
        c + "{{" + $("#token").find(":selected").text() + "}}" + a
      );
    }
    c = document.querySelector("textarea#message").value;
    chrome.storage.local.set({ text: c }, function () {});
  });
  $("#token_attachment").change(function () {
    if ($("#token_attachment").find(":selected").attr("disabled") === void 0) {
      var a = $("#attachment_modal_file_caption").prop("selectionStart"),
        b = $("#attachment_modal_file_caption").val(),
        c = b.substring(0, a);
      a = b.substring(a, b.length);
      $("#attachment_modal_file_caption").val(
        c + "{{" + $("#token_attachment").find(":selected").text() + "}}" + a
      );
    }
  });
  $("#addTemplate").click(function () {
    document.querySelector("#message").value !== "" &&
      chrome.storage.local.get(["templatesObj"], function (a) {
        ((a = a.templatesObj) && a instanceof Array) || (a = []);
        a.push(document.querySelector("#message").value);
        let b = document.createElement("option");
        b.innerText = document.querySelector("#message").value.trim();
        b.classList.add("template-text");
        b.value = document.querySelector("#message").value;
        document.querySelector("#template-dropdown").appendChild(b);
        $("#template-dropdown").selectpicker("refresh");
        chrome.storage.local.set({ templatesObj: a }, function () {});
        iziToast.success({
          title: chrome.i18n.getMessage("templateModifyTitle"),
          message: chrome.i18n.getMessage("templateAddedMessage"),
          displayMode: 0,
          position: "topRight",
        });
      });
  });
  $("#template-dropdown").on("change", function () {
    $("#template-dropdown").find(":selected").attr("disabled") ||
      ((document.querySelector("textarea#message").value = $(
        "#template-dropdown"
      )
        .find(":selected")
        .val()),
      $("#deleteTemplate").css("display", ""));
    chrome.storage.local.set({
      text: document.querySelector("textarea#message").value,
    });
  });
  $("#supportFooter, #SupportTutorial, #activationSupportLink").on(
    "click",
    () => {
      chrome.tabs.query({ active: !0, currentWindow: !0 }, function (a) {
        chrome.tabs.sendMessage(a[0].id, {
          context: { contactSupport: !0, supportNumber: K },
        });
      });
    }
  );
  $("#deleteTemplate").on("click", () => {
    let a = $("#template-dropdown").find(":selected");
    a.attr("disabled") ||
      (a.remove(),
      $("#template-dropdown").selectpicker("refresh"),
      $("#template-dropdown").selectpicker("val", "default"),
      $("#deleteTemplate").css("display", "none"),
      chrome.storage.local.get(["templatesObj"], function (b) {
        if ((b = b.templatesObj)) {
          var c = b.indexOf(a.val());
          c !== -1 &&
            (b.splice(c, 1),
            chrome.storage.local.set({ templatesObj: b }, function () {}),
            iziToast.success({
              title: chrome.i18n.getMessage("templateModifyTitle"),
              message: chrome.i18n.getMessage("templateRemoveMessage"),
              displayMode: 0,
              position: "topRight",
            }));
        }
      }));
  });
  xa.addEventListener("click", async function () {
    let a = !0,
      b = !1;
    (await l("ALLOWED_UPPER_LIMIT")).ALLOWED_UPPER_LIMIT == void 0
      ? await h({ ALLOWED_UPPER_LIMIT: !1 })
      : await l("ALLOWED_UPPER_LIMIT");
    (await l("ALLOWED_LOWER_LIMIT")).ALLOWED_LOWER_LIMIT == void 0
      ? await h({ ALLOWED_LOWER_LIMIT: !1 })
      : (b = (await l("ALLOWED_LOWER_LIMIT")).ALLOWED_LOWER_LIMIT);
    let c = (await l("mainUser")).mainUser.messagesSent,
      d = await l("attachment_data"),
      f;
    d.attachment_data
      ? (d = d.attachment_data)
      : ((d = []), h({ attachment_data: d }));
    if (
      document.getElementById("message").value.trim() === "" &&
      (d.length < 1 || !D)
    )
      iziToast.error({
        title: "Error",
        message: "Text Message can not be empty or add Some Attachment",
        displayMode: 0,
        position: "topRight",
      });
    else {
      let y = document.getElementById("message").value,
        M = document.getElementById("addTimeStamp_option").checked;
      if (w.length) {
        if (!p) return;
        var e = $("#options").find(":selected").val();
        Q = [];
        let C = [w[0], ...w.slice(q - 1, r)];
        for (var g = 1; g < C.length; g++) {
          var n = C[g][e];
          n == null || n == void 0 ? Q.push("") : Q.push(n);
        }
        f = {
          command: "start messaging background",
          is_image: D && d.length > 0,
          arr: Q,
          message: y,
          premium: p,
          timeDelayFrom: t,
          timeDelayTo: u,
          is_time_stamp: M,
          fs: I,
          batched: !1,
          is_custom_message: R,
          execl_coloumn: C,
        };
      } else
        (e = $("#number").val().split(",")),
          (f = {
            command: "start messaging background",
            is_image: D && d.length > 0,
            arr: e,
            timeDelayFrom: t,
            timeDelayTo: u,
            is_time_stamp: M,
            batched: !1,
            message: y,
            premium: p,
            is_unsubscribe: I,
          });
      !p && f.arr.length > v
        ? ((a = !1),
          await new Promise(async (C) => {
            v > 0
              ? oa(
                  chrome.i18n.getMessage("iziToastErrMsgLeftMsg", [v]),
                  "center",
                  C
                )
              : oa(
                  chrome.i18n.getMessage("iziToastErrMsgFinishedMsg", [B]),
                  "center",
                  C
                );
          }))
        : (c >= 50) & (c <= 100) & !b &&
          (await new Promise(async (C) => {
            iziToast.question({
              timeout: 2e4,
              close: !1,
              overlay: !0,
              displayMode: "once",
              id: "question",
              zindex: 999,
              title: chrome.i18n.getMessage("iziToastMsgLimitWarning"),
              message: chrome.i18n.getMessage("iziToastMsgLimitWarningMsg", [
                "50",
              ]),
              position: "center",
              buttons: [
                [
                  "<button><is_attachment>Yes, Send Now</is_attachment></button>",
                  function (Z, aa) {
                    C();
                    a = !0;
                    Z.hide({ transitionOut: "fadeOut" }, aa, "button");
                    h({ ALLOWED_LOWER_LIMIT: !0 });
                  },
                  !0,
                ],
                [
                  "<button>No, Don't Send</button>",
                  function (Z, aa) {
                    C();
                    a = !1;
                    Z.hide({ transitionOut: "fadeOut" }, aa, "button");
                  },
                ],
              ],
              onClosing: function () {},
              onClosed: function () {},
            });
          }));
      a &&
        ((k = { ...k, state: "SEND", operation: "MESSAGE" }),
        chrome.storage.local.set({ currentState: k }, () => {
          $("#send").css("display", "none");
          $("#stop").css("display", "");
          $("#pause").css("display", "");
          $("#continue").css("display", "none");
          $("#export_results").css("display", "none");
          $("#filter_numbers").attr("disabled", "disabled");
          chrome.runtime.sendMessage({ context: f });
        }));
    }
  });
  $("#stop").on("click", function () {
    $("#send").css("display", "");
    $("#continue").css("display", "none");
    $("#stop").css("display", "none");
    $("#pause").css("display", "none");
    $("#export_results").css("display", "");
    x = { process_state: "STOP" };
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (a) {
      chrome.tabs.sendMessage(a[0].id, { context: x }, function () {});
    });
  });
  $("#export_results").click(function () {
    x = { export_results: "true" };
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (a) {
      chrome.tabs.sendMessage(a[0].id, { context: x }, function () {});
    });
  });
  chrome.runtime.onMessage.addListener(async (a) => {
    if (a.from === "content")
      if (a.count < a.total)
        a.subject == "progress-bar-filter"
          ? ((document.getElementById("sorted-number-filter").innerHTML =
              a.count + 1 + "/" + a.total),
            (a = ((a.count + 1) * 115) / a.total),
            (document.getElementById("progress-indicator-filter").style.width =
              a.toString() + "px"),
            (document.getElementById(
              "progress-container-filter"
            ).style.display = "block"))
          : a.subject == "progress-bar-sent" &&
            (p
              ? (document.getElementById("messageCount").innerHTML = `<strong>${
                  m.messagesSent + a.sent
                }</strong>`)
              : (document.getElementById("messageCount").innerHTML = `<strong>${
                  v - a.sent
                }</strong>`),
            (document.getElementById("sorted-number-sent").innerHTML =
              a.count + 1 + "/" + a.total),
            (a = ((a.count + 1) * 115) / a.total),
            (document.getElementById("progress-indicator-sent").style.width =
              a.toString() + "px"),
            (document.getElementById("progress-container-sent").style.display =
              "block"));
      else {
        $("#send").css("display", "");
        $("#continue").css("display", "none");
        $("#stop").css("display", "none");
        $("#pause").css("display", "none");
        $("#export_results").css("display", "");
        $("#filter_numbers").removeAttr("disabled");
        document.getElementById("progress-container-filter").style.display =
          "none";
        document.getElementById("progress-container-sent").style.display =
          "none";
        a.subject == "progress-bar-sent" &&
          (p
            ? (document.getElementById("messageCount").innerHTML = `<strong>${
                m.messagesSent + a.sent
              }</strong>`)
            : (document.getElementById("messageCount").innerHTML = `<strong>${
                v - a.sent
              }</strong>`),
          (m.messagesSent += a.sent),
          (v -= a.sent));
        let b = (await l("reviewAskLastDate")).reviewAskLastDate,
          c = (await l("reviewUs")).reviewUs;
        c == void 0 ||
          c ||
          (b != void 0
            ? ((b = new Date(b)),
              (new Date() - b) / 864e5 > 1 && $("#reviewFooter").click())
            : m.messagesSent + a.sent > 10 && $("#reviewFooter").click());
      }
  });
  $("#timer-checkbox").change(function () {
    let a = document.querySelector("#timer-checkbox").checked;
    a
      ? ($("#timer-gap-inputs").css("display", "block"),
        (t = parseInt($("#time-delay").val())),
        (u = parseInt($("#time-delay-to").val())),
        h({ timeDelayFrom: t, timeDelayTo: u }))
      : ($("#timer-gap-inputs").css("display", "none"), (u = t = 1));
    h({ timer_gap: a });
  });
  $("#time-delay").on("blur", function (a) {
    a.target.value < 1 && (a.target.value = 1);
    a.target.value = parseInt(a.target.value);
    u = parseInt(u);
    a.target.value > u && (a.target.value = u);
    t = parseInt(a.target.value || 10);
    h({ timeDelayFrom: t });
  });
  $("#time-delay-to").on("blur", function (a) {
    a.target.value > 300 && (a.target.value = 300);
    a.target.value = parseInt(a.target.value);
    t = parseInt(t);
    a.target.value < t && (a.target.value = t);
    u = parseInt(a.target.value || 10);
    h({ timeDelayTo: u });
  });
  $("#pause").on("click", () => {
    x = { process_state: "PAUSE" };
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (a) {
      chrome.tabs.sendMessage(a[0].id, { context: x }, function () {});
    });
    $("#send").css("display", "none");
    $("#continue").css("display", "");
    $("#stop").css("display", "");
    $("#pause").css("display", "none");
    $("#export_results").css("display", "none");
  });
  $("#continue").on("click", () => {
    x = { process_state: "CONTINUE" };
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (a) {
      chrome.tabs.sendMessage(a[0].id, { context: x }, function () {});
    });
    $("#send").css("display", "none");
    $("#continue").css("display", "none");
    $("#stop").css("display", "");
    $("#pause").css("display", "");
    $("#export_results").css("display", "none");
  });
  $(
    "#form-checks input, #unsub_div input, #addTimeStamp input,#custom_div input ,#batching-timer-checkbox, #batching-numbers,#batching-time-delay, #send_attachments, #uncheck_attachment"
  ).change(function () {
    let a = document.querySelector("#send_attachments").checked,
      b = document.querySelector("#unsubscribe_option").checked,
      c = document.querySelector("#addTimeStamp_option").checked,
      d = document.querySelector("#is_custom_message").checked,
      f = document.querySelector("textarea#message").value;
    chrome.storage.local.set({
      attachment: a,
      unsubscribe: b,
      addTimeStamp: c,
      customMessage: d,
      text: f,
    });
  });
  let z = document.getElementById("blurToggleAll"),
    ba = document.getElementById("blurAllMessageToggle"),
    ca = document.getElementById("blurLastMesssageToggle"),
    da = document.getElementById("blurMediaPreviewToggle"),
    ea = document.getElementById("blurMediaGallaryToggle"),
    fa = document.getElementById("blurTextInputToggle"),
    ha = document.getElementById("blurProfilePictureToggle"),
    ia = document.getElementById("blurGroupUserNameToggle"),
    ja = document.getElementById("noTransitionDelayToggle"),
    ka = document.getElementById("unblurAllToggle");
  z.addEventListener("change", function () {
    chrome.storage.local.set({
      blurToggleAll: this.checked,
      blurAllMessageToggle: this.checked,
      blurLastMesssageToggle: this.checked,
      blurMediaPreviewToggle: this.checked,
      blurMediaGallaryToggle: this.checked,
      blurTextInputToggle: this.checked,
      blurProfilePictureToggle: this.checked,
      blurGroupUserNameToggle: this.checked,
      noTransitionDelayToggle: this.checked,
      unblurAllToggle: this.checked,
    });
    ba.checked =
      ca.checked =
      da.checked =
      ea.checked =
      fa.checked =
      ha.checked =
      ia.checked =
      ja.checked =
      ka.checked =
        this.checked;
    A();
  });
  ba.addEventListener("change", function () {
    chrome.storage.local.set({ blurAllMessageToggle: this.checked });
    this.checked ||
      (chrome.storage.local.set({ blurToggleAll: this.checked }),
      (z.checked = this.checked));
    A();
  });
  ca.addEventListener("change", function () {
    chrome.storage.local.set({ blurLastMesssageToggle: this.checked });
    this.checked ||
      (chrome.storage.local.set({ blurToggleAll: this.checked }),
      (z.checked = this.checked));
    A();
  });
  da.addEventListener("change", function () {
    chrome.storage.local.set({ blurMediaPreviewToggle: this.checked });
    this.checked ||
      (chrome.storage.local.set({ blurToggleAll: this.checked }),
      (z.checked = this.checked));
    A();
  });
  ea.addEventListener("change", function () {
    chrome.storage.local.set({ blurMediaGallaryToggle: this.checked });
    this.checked ||
      (chrome.storage.local.set({ blurToggleAll: this.checked }),
      (z.checked = this.checked));
    A();
  });
  fa.addEventListener("change", function () {
    chrome.storage.local.set({ blurTextInputToggle: this.checked });
    this.checked ||
      (chrome.storage.local.set({ blurToggleAll: this.checked }),
      (z.checked = this.checked));
    A();
  });
  ha.addEventListener("change", function () {
    chrome.storage.local.set({ blurProfilePictureToggle: this.checked });
    this.checked ||
      (chrome.storage.local.set({ blurToggleAll: this.checked }),
      (z.checked = this.checked));
    A();
  });
  ia.addEventListener("change", function () {
    chrome.storage.local.set({ blurGroupUserNameToggle: this.checked });
    this.checked ||
      (chrome.storage.local.set({ blurToggleAll: this.checked }),
      (z.checked = this.checked));
    A();
  });
  ja.addEventListener("change", function () {
    chrome.storage.local.set({ noTransitionDelayToggle: this.checked });
    this.checked ||
      (chrome.storage.local.set({ blurToggleAll: this.checked }),
      (z.checked = this.checked));
    A();
  });
  ka.addEventListener("change", function () {
    chrome.storage.local.set({ unblurAllToggle: this.checked });
    this.checked ||
      (chrome.storage.local.set({ blurToggleAll: this.checked }),
      (z.checked = this.checked));
    A();
  });
  window.onload = function () {
    chrome.storage.local.get(
      "numbersList text send_status attachment attachment_data image doc contact unsubscribe addTimeStamp customMessage templatesObj to_column from_column contacts sheets_json batching batch_size batch_delay timer_gap timeDelayFrom timeDelayTo sheet_number currentState blurToggleAll blurAllMessageToggle blurLastMesssageToggle blurMediaPreviewToggle blurMediaGallaryToggle blurTextInputToggle blurProfilePictureToggle blurGroupUserNameToggle noTransitionDelayToggle unblurAllToggle".split(
        " "
      ),
      async function (a) {
        if (a.currentState) {
          k = a.currentState;
          let d, f, e;
          var b = $("#send");
          var c = $("#pause");
          d = $("#continue");
          f = $("#stop");
          e = $("#export_results");
          switch (k.state) {
            case "PAUSE":
              d.css("display", "");
              f.css("display", "");
              c.css("display", "none");
              b.css("display", "none");
              e.css("display", "none");
              break;
            case "SEND":
              d.css("display", "none"),
                f.css("display", ""),
                c.css("display", ""),
                b.css("display", "none"),
                e.css("display", "none");
          }
          if (k.state === "PAUSE" || k.state === "SEND")
            $("#filter_numbers").attr("disabled", "disabled"),
              k.operation === "FILTER"
                ? ((document.getElementById("sorted-number-filter").innerHTML =
                    k.msgCount + 1 + "/" + k.msgTotal),
                  (b = ((k.msgCount + 1) * 115) / k.msgTotal),
                  (document.getElementById(
                    "progress-indicator-filter"
                  ).style.width = b.toString() + "px"),
                  (document.getElementById(
                    "progress-container-filter"
                  ).style.display = "block"))
                : k.operation === "MESSAGE" &&
                  (p
                    ? (document.getElementById(
                        "messageCount"
                      ).innerHTML = `<strong>${
                        m.messagesSent + k.msgSent
                      }</strong>`)
                    : (document.getElementById(
                        "messageCount"
                      ).innerHTML = `<strong>${v - k.msgSent}</strong>`),
                  (document.getElementById("sorted-number-sent").innerHTML =
                    k.msgCount + 1 + "/" + k.msgTotal),
                  (b = ((k.msgCount + 1) * 115) / k.msgTotal),
                  (document.getElementById(
                    "progress-indicator-sent"
                  ).style.width = b.toString() + "px"),
                  (document.getElementById(
                    "progress-container-sent"
                  ).style.display = "block"));
        }
        document.getElementById("number").value = a.numbersList || "";
        a.numbersList &&
          ($("#sheet_number").attr("disabled", !0),
          $("#input").attr("disabled", !0),
          $("#input")
            .parent()
            .closest("label")
            .removeClass("bg-green-700 hover:bg-green-900"),
          $("#input").parent().closest("label").addClass("bg-gray-700"),
          $("#input")
            .parent()
            .closest("label")
            .attr("title", chrome.i18n.getMessage("uploadExcelDisabledLabel")),
          $("#downloadExcelTemplate").attr("disabled", !0),
          $("#verifyGoogleSheet").attr("disabled", !0),
          $("#verifyGoogleSheet").css("background-color", "grey"),
          (b = a.numbersList.replace(/[^\d,]/g, "")),
          (b = b.split(",")),
          (b = b.filter((d) => d)),
          $("#contacts-found").text(
            chrome.i18n.getMessage("contactFoundText", [b.length])
          ),
          $("#contacts-found").css("display", "flex"),
          $("#send").attr("disabled", !1));
        $("#personalizedVariable").text(
          chrome.i18n.getMessage("uploadExcelBtn")
        );
        $("#personalizedVariable_attachment").text(
          chrome.i18n.getMessage("uploadExcelBtn")
        );
        document.querySelector("textarea#message").value = a.text || "";
        a.attachment &&
          (document
            .querySelector("#send_attachments")
            .setAttribute("checked", ""),
          $("#send_attachments_label").addClass("switch-button-checked"));
        a.unsubscribe &&
          document
            .querySelector("#unsubscribe_option")
            .setAttribute("checked", a.unsubscribe);
        a.addTimeStamp
          ? document
              .querySelector("#addTimeStamp_option")
              .setAttribute("checked", a.addTimeStamp)
          : (a.addTimeStamp == void 0 || a.addTimeStamp == null) &&
            document
              .querySelector("#addTimeStamp_option")
              .setAttribute("checked", !0);
        a.customMessage &&
          document
            .querySelector("#is_custom_message")
            .setAttribute("checked", a.customMessage);
        a.attachment &&
          ((D = !0),
          (document.querySelector("#steps_for_attachments").style.display =
            "flex"),
          $("#add_attachment_button").removeClass("hidden"));
        a.attachment_data && X();
        a.timer_gap &&
          (document
            .querySelector("#timer-checkbox")
            .setAttribute("checked", a.timer_gap),
          (document.querySelector("#timer-gap-inputs").style.display =
            "block"));
        a.timeDelayFrom && a.timeDelayTo
          ? (document.querySelector("#time-delay").removeAttribute("disabled"),
            document
              .querySelector("#time-delay")
              .setAttribute("value", a.timeDelayFrom),
            (t = a.timeDelayFrom),
            document
              .querySelector("#time-delay-to")
              .setAttribute("value", a.timeDelayTo),
            (u = a.timeDelayTo))
          : (u = t = 1);
        document.querySelector("#time-delay").removeAttribute("title");
        if (
          !a.templatesObj ||
          (a.templatesObj[0] && a.templatesObj[0] instanceof Array)
        )
          (a.templatesObj = []), chrome.storage.local.set({ templatesObj: [] });
        a.templatesObj.forEach((d) => {
          let f = document.createElement("option");
          f.innerText = d.trim();
          f.classList.add("template-text");
          f.value = d;
          document.querySelector("#template-dropdown").appendChild(f);
          $("#template-dropdown").selectpicker("refresh");
        });
        a.customMessage &&
          ((R = !0),
          (document.getElementById("token").style.display = "inline-block"));
        a.sheets_json
          ? ($("#number").tokenfield({
              inputType: "tel",
              createTokensOnBlur: !0,
            }),
            $("#number-tokenfield").attr(
              "placeholder",
              chrome.i18n.getMessage("numberPlaceholderDisabled")
            ),
            $("#number").tokenfield("disable"),
            $("#sheet_number").attr("disabled", !0),
            $("#verifyGoogleSheet").attr("disabled", !0),
            $("#verifyGoogleSheet").removeClass("bg-green-700"),
            $("#verifyGoogleSheet").addClass("bg-gray-700"),
            $("#personalizedVariable").text("Select Variable"),
            $("#personalizedVariable_attachment").text("Select Variable"),
            $("#contacts-found").css("display", "flex"),
            $("#send").attr("disabled", !1),
            (J = a.sheets_json),
            (b = (await chrome.storage.local.get("sheetNumber")).sheetNumber) ||
              (b = 0),
            W(J, b),
            (b = (await chrome.storage.local.get("numberColumn"))
              .numberColumn) && $("#options").val(b),
            (b = (await chrome.storage.local.get("from_column")).from_column),
            (c = (await chrome.storage.local.get("to_column")).to_column),
            b && ((q = b), $("#enter-excel-from").val(q)),
            c && ((r = c), $("#enter-excel-to").val(r)),
            $("#contacts-found").text(
              chrome.i18n.getMessage("contactFoundText", [r - q + 1])
            ))
          : document.getElementById("number").value == "" &&
            $("#contacts-found").text(
              chrome.i18n.getMessage("contactFoundText", [0])
            );
        (a.contacts && a.contacts.length != 0) ||
          a.numbersList ||
          $("#send").attr("disabled", !0);
        z.checked = a.blurToggleAll;
        ba.checked = a.blurAllMessageToggle;
        ca.checked = a.blurLastMesssageToggle;
        da.checked = a.blurMediaPreviewToggle;
        ea.checked = a.blurMediaGallaryToggle;
        fa.checked = a.blurTextInputToggle;
        ha.checked = a.blurProfilePictureToggle;
        ia.checked = a.blurGroupUserNameToggle;
        ja.checked = a.noTransitionDelayToggle;
        ka.checked = a.unblurAllToggle;
      }
    );
  };
  $("#addMember").on("click", () => {
    $("#addingMember").is(":visible")
      ? $("#addingMember").hide()
      : $("#addingMember").show();
  });
  $("#addNewMember").on("click", async () => {
    let a = (await l("mainUser")).mainUser;
    var b = a.planhistory;
    let c = b[b.length - 1].usageQuantityAllowed[0],
      d = a.collaborators;
    if (d.length >= c)
      iziToast.error({
        title: chrome.i18n.getMessage("iziToastExcelSizeError"),
        message: chrome.i18n.getMessage("iziToastErrMsgQuotaExceedMsg"),
        displayMode: 0,
        position: "topRight",
      });
    else if (
      d.some(function (g) {
        return g.phoneNumber === $("#memberPhone").val();
      })
    )
      iziToast.warning({
        title: chrome.i18n.getMessage("iziToastMemberAlreadyPresentWarning"),
        message: chrome.i18n.getMessage(
          "iziToastMemberAlreadyPresentWarningMsg"
        ),
        displayMode: 0,
        position: "topRight",
      });
    else if ($("#memberName").val() && $("#memberPhone").val()) {
      await V("ADD", $("#memberPhone").val(), $("#memberName").val());
      b = $(".teamMember").eq(0).clone();
      b.prop("id", $("#memberPhone").val()).removeClass("hidden");
      b.find(".memberName").text($("#memberName").val());
      var f = b.find(".memberNumber");
      f.text($("#memberPhone").val());
      b.find(".removeMember").on("click", async () => {
        $(`#${f.text()}`).remove();
        d = m.collaborators;
        var g = d.map((n) => n.phoneNumber).indexOf(f.text());
        g > -1 && (d.splice(g, 1), (m.collaborators = d), h({ mainUser: m }));
        g = d.length;
        $("#memberCount").html(chrome.i18n.getMessage("memberCount", [g, c]));
        V("REMOVE", f.text(), "");
        g == 0 && $("#noteamMember").show();
        $("#addMember").removeAttr("disabled");
      });
      var e = {};
      e.name = $("#memberName").val();
      e.phoneNumber = $("#memberPhone").val();
      d.push(e);
      m.collaborators = d;
      h({ mainUser: a, user: m });
      $("#memberCount").html(
        chrome.i18n.getMessage("memberCount", [d.length, c])
      );
      d.length == c && $("#addMember").attr("disabled", "true");
      $("#memberTable").append(b);
      iziToast.success({
        title: chrome.i18n.getMessage("iziToastMemberAddedSuccess"),
        message: chrome.i18n.getMessage("iziToastMemberAddedSuccessMsg"),
        displayMode: 0,
        position: "topRight",
      });
      $("#addingMember").hide();
      $("#memberName").val("");
      $("#memberPhone").val("");
      $("#noteamMember").hide();
    } else
      iziToast.warning({
        title: chrome.i18n.getMessage("iziToastAddNamePhoneWarning"),
        message: chrome.i18n.getMessage("iziToastAddNamePhoneWarningMsg"),
        displayMode: 0,
        position: "topRight",
      });
  });
  const ta = () => {
      iziToast.info({
        timeout: 2e4,
        close: !1,
        overlay: !0,
        animateInside: !0,
        iconUrl: "./assets/star.svg",
        displayMode: "once",
        id: "question",
        zindex: 999,
        title: chrome.i18n.getMessage("iziToastUpgradeInfo"),
        message: chrome.i18n.getMessage("iziToastUpgradeInfoMsg", [B, K]),
        position: "center",
        buttons: [
          [
            "<button>Not now</button>",
            function (a, b) {
              a.hide({ transitionOut: "fadeOut" }, b, "button");
            },
          ],
          [
            "<button>Upgrade Now</button>",
            async function (a, b) {
              a.hide({ transitionOut: "fadeOut" }, b, "button");
              window.open("https://wamessager.com/pricing", "_blank");
            },
            !0,
          ],
        ],
        onClosing: function () {},
        onClosed: function () {},
      });
    },
    h = (a) =>
      new Promise((b, c) =>
        chrome.storage.local.set(a, () => {
          chrome.runtime.lastError
            ? c(Error(chrome.runtime.lastError.message))
            : b();
        })
      ),
    l = (a) =>
      new Promise((b, c) =>
        chrome.storage.local.get(a, (d) => {
          chrome.runtime.lastError
            ? c(Error(chrome.runtime.lastError.message))
            : b(d == void 0 ? null : d);
        })
      );
  $("#msg_preview_button").click(async function () {
    var a = await l("attachment_data");
    a.attachment_data
      ? (a = a.attachment_data)
      : ((a = []), h({ attachment_data: a }));
    if (
      document.getElementById("message").value.trim() === "" &&
      (a.length < 1 || !D)
    )
      iziToast.error({
        title: "Error",
        message: "Text Message can not be empty or add Some Attachment",
        displayMode: 0,
        position: "topRight",
      });
    else {
      var b = $("#myNumber").text().split(",");
      let c = document.getElementById("addTimeStamp_option").checked;
      a = {
        command: "start messaging background",
        is_image: D && a.length > 0,
        arr: b,
        timeDelayFrom: t,
        timeDelayTo: u,
        is_time_stamp: c,
        batched: !1,
        message: document.getElementById("message").value,
        premium: p,
        is_unsubscribe: I,
      };
      chrome.runtime.sendMessage({ context: a });
      iziToast.success({
        title: "Success",
        message: "Kindly Check Preview Message sent to your Whatsapp Number",
        displayMode: 0,
        position: "topRight",
      });
    }
  });
  $("#onboardingSend").click(async () => {
    x = {
      command: "start messaging background",
      is_image: !1,
      arr: $("#onboardingNumber").val().split(","),
      timeDelayFrom: t,
      timeDelayTo: u,
      is_time_stamp: !0,
      batched: !1,
      message: document.getElementById("onboardingMessage").value,
      premium: p,
      is_unsubscribe: I,
    };
    chrome.runtime.sendMessage({ context: x });
    $("#onboarding,#unsynced").hide();
    $("#loadingScreen").show();
    h({ onBoarding: !0 });
    U();
    $("#Enhancement").click();
  });
  $("#reviewFooter").click(async () => {
    console.log("review clicked");
    h({ reviewAskLastDate: Date.now() });
    let a = chrome.i18n.getMessage("iziToastReviewMessage");
    p || (a += chrome.i18n.getMessage("iziToastReviewMessageOffer"));
    iziToast.question({
      timeout: 2e4,
      close: !1,
      color: "green",
      overlay: !0,
      animateInside: !0,
      iconUrl: "./assets/star.svg",
      displayMode: "once",
      id: "question",
      zindex: 999,
      title: chrome.i18n.getMessage("iziToastReviewTitle"),
      message: a,
      position: "center",
      buttons: [
        [
          "<button>Not now</button>",
          function (b, c) {
            b.hide({ transitionOut: "fadeOut" }, c, "button");
          },
        ],
        [
          "<button>Rate Us 5 Stars</button>",
          async function (b, c) {
            b.hide({ transitionOut: "fadeOut" }, c, "button");
            window.open(
              "https://chrome.google.com/webstore/detail/best-wa-sender-free-softw/afgbckekjlfkfhklldgdndiagddhbohm/reviews",
              "_blank"
            );
            h({ reviewUs: !0 });
          },
          !0,
        ],
      ],
      onClosing: function () {},
      onClosed: function () {},
    });
  });
  $("#enterCodeButton").click(function () {
    $("#activation_error_message").css("display", "none");
    $("#activationCode").val("");
  });
  $("#activateBtn").click(async function () {
    let a = $("#activationCode").val();
    a.length < 6
      ? ($("#activation_error_message").css("display", "flex"),
        $("#activation_error_message").html("Invalid Activation Code"))
      : await fetch(
          `${"https://wamessager-backend.onrender.com"}/api/user/activation?phoneNumber=${S}&activationCode=${a}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        )
          .then((b) => b.json())
          .then((b) => {
            b.success
              ? ($("#activation_error_message").css("display", "none"),
                $("#closeModal").click(),
                U())
              : ($("#activation_error_message").css("display", "flex"),
                $("#activation_error_message").html(b.message));
          })
          .catch(() => {
            $("#activation_error_message").css("display", "flex");
            $("#activation_error_message").html(
              "Something went wrong, contact support"
            );
          });
  });
});
