import CreateIcon from "@mui/icons-material/Create";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {FC} from "react";
import {UseRenderModeProvider, useTodo} from "../../../../../hooks";
import {EditProjectForm} from "./EditProjectForm";
import {IToDoProject, RenderMode} from "../../../../../types";
import {useParams} from "react-router-dom";
import {RenderModeController} from "../../../../../components/ctrl";

interface Props {
  project: IToDoProject;
}

const AppProjectItem: FC<Props> = ({project}) => {
  const {deleteProject} = useTodo();
  const {projectId: currentProjectId} = useParams<{ projectId: string }>();

  return (
    <ListItem
      component={'div'}
      sx={{
        paddingRight: 0,
      }}
      key={project.id}
    >
      <UseRenderModeProvider defaultMode={RenderMode.View}>
        <RenderModeController
          renderEdit={(onChangeRenderMode) => (
            <EditProjectForm
              project={project}
              onCancel={() => onChangeRenderMode(RenderMode.View)}
            />
          )}
          renderView={(onChangeRenderMode) => (
            <>
              <ListItemButton
                selected={project.id === currentProjectId}
                sx={{}}
                href={project.id}
              >
                <ListItemText
                  sx={{
                    overflowWrap: "break-word",
                  }}
                  primary={project.title}
                />
              </ListItemButton>
              <Box
                sx={{
                  marginTop: "1.5%",
                  display: "inline-flex",
                  width: "40%",
                }}
              >
                <Button
                  sx={{
                    width: "5px",
                  }}
                  onClick={() => onChangeRenderMode(RenderMode.Edit)}
                >
                  <CreateIcon
                    sx={{
                      marginRight: "5px",
                    }}
                    color="secondary"
                  />
                </Button>
                <Button onClick={() => deleteProject(project.id)}>
                  <DeleteForeverIcon color="error"/>
                </Button>
              </Box>
            </>
          )}
        />
      </UseRenderModeProvider>
    </ListItem>
  );
}

export default AppProjectItem;
