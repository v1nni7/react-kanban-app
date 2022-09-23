import { useContext, useState, useEffect, useCallback } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { ValidationError } from "yup";
import { toast, ToastContainer } from "react-toastify";

import Modal from "../components/Modal";
import { AuthContext } from "../hooks/context/AuthContext";

import Form from "../assets/styles/Form";
import Icon from "../assets/styles/Icon";
import Workspace from "../assets/styles/Workspace";
import { Flex } from "../assets/styles/Modal";
import workspaceSchemaValidate from "../assets/schema/workspaceSchemaValidate";
import boardServices from "../services/boardServices";

const WorkspacePage = () => {
  const boardValues = {
    name: "",
    background: "",
  };

  const [boards, setBoards] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isModalOpen, setIsModalOpen] = useState<any>(false);

  const handleCreateBoard = useCallback(async (data: any) => {
    try {
      setIsLoading(true);
      await workspaceSchemaValidate.workspaceSchema(data);

      const response = await boardServices.createBoard(data);

      if (response.status === 201) {
        setIsModalOpen(false);
        setBoards((prevState: any) => [...prevState, response.data]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadingBoards = useCallback(async () => {
    try {
      const response = await boardServices.getBoards();

      if (response.status === 200) {
        setBoards(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadingBoards();
  }, [loadingBoards]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Workspace.Container>
        <Workspace.Horizontal>
          <Workspace.Item onClick={() => setIsModalOpen(true)}>
            <h2>Create new board</h2>
          </Workspace.Item>

          {boards.map((board: any, index: number) => (
            <Link key={index} to={`/board/${board.stringId}`}>
              <Workspace.Item className="teste" image={board.background}>
                <Workspace.Overlay>
                  <h2>{board.name}</h2>
                </Workspace.Overlay>
              </Workspace.Item>
            </Link>
          ))}

          {/*   */}
        </Workspace.Horizontal>
      </Workspace.Container>

      <Modal onHide={() => setIsModalOpen(false)} modalOpen={isModalOpen}>
        <Flex>
          <Formik
            enableReinitialize
            initialValues={boardValues}
            onSubmit={handleCreateBoard}
          >
            {({ handleChange, values }) => (
              <>
                <Form.Horizontal>
                  <Form.Group>
                    <Form.Label htmlFor="board">
                      <Icon.Board />
                    </Form.Label>
                    <Form.Control
                      id="board"
                      type="text"
                      onChange={handleChange("name")}
                      placeholder="Board name"
                      value={values.name}
                      disabled={isLoading}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="background">
                      <Icon.Image />
                    </Form.Label>
                    <Form.Control
                      id="background"
                      type="text"
                      placeholder="Background image"
                      onChange={handleChange("background")}
                      value={values.background}
                      disabled={isLoading}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Submit type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <ThreeDots color="#fff" height={20} width={60} />
                      ) : (
                        "Create board"
                      )}
                    </Form.Submit>
                  </Form.Group>
                </Form.Horizontal>
              </>
            )}
          </Formik>

          <img
            src="https://media.discordapp.net/attachments/1013165623188148234/1020764046041034853/20945830.png"
            alt=""
          />
        </Flex>
      </Modal>
    </>
  );
};

export default WorkspacePage;
