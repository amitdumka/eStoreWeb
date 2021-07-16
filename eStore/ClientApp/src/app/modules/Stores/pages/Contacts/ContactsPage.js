import React from "react";
import { Route } from "react-router-dom";
import { ContactsLoadingDialog } from "./dialogs/LoadingDialog";
import { EditDialog } from "./dialogs/EditDialog";

import { DeleteDialog } from "./dialogs/DeleteDialog";

import { DeletesDialog } from "./dialogs/DeletesDialog";

import { FetchDialog } from "./dialogs/FetchDialog";
import { UpdateStateDialog } from "./dialogs/UpdateStateDialog";
import { UIProvider } from "./UIContext";
import { ContactsCard } from "./ContactsCard";

//Contact
//contact

export function ContactsPage({ history }) {
  const contactsUIEvents = {
    newContactButtonClick: () => {
      history.push("/store/contacts/new");
    },
    openEditContactDialog: (id) => {
      history.push(`/store/contacts/${id}/edit`);
    },
    openDeleteContactDialog: (id) => {
      history.push(`/store/contacts/${id}/delete`);
    },
    openDeleteContactsDialog: () => {
      history.push(`/store/contacts/deleteContacts`);
    },
    openFetchContactsDialog: () => {
      history.push(`/store/contacts/fetch`);
    },
    openUpdateContactsStatusDialog: () => {
      history.push("/store/contacts/updateStatus");
    }
  }

  return (
    <UIProvider UIEvents={contactsUIEvents}>
      <ContactsLoadingDialog />
      <Route path="/store/contacts/new">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            onHide={() => {
              history.push("/store/contacts");
            }}
          />
        )}
      </Route>
      <Route path="/store/contacts/:id/edit">
        {({ history, match }) => (
          <EditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/store/contacts");
            }}
          />
        )}
      </Route>
      <Route path="/store/contacts/deleteContacts">
        {({ history, match }) => (
          <DeletesDialog
            show={match != null}
            onHide={() => {
              history.push("/store/contacts");
            }}
          />
        )}
      </Route>
      <Route path="/store/contacts/:id/delete">
        {({ history, match }) => (
          <DeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/store/contacts");
            }}
          />
        )}
      </Route>
      <Route path="/store/contacts/fetch">
        {({ history, match }) => (
          <FetchDialog
            show={match != null}
            onHide={() => {
              history.push("/store/contacts");
            }}
          />
        )}
      </Route>
      <Route path="/store/contacts/updateStatus">
        {({ history, match }) => (
          <UpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/store/contacts");
            }}
          />
        )}
      </Route>
      <ContactsCard />
    </UIProvider>
  );
}
