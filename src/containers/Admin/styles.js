export const styles = `
  .admin-dashboard {
    background-color: rgba(202, 196, 208, 1);
    display: flex;
    min-height: 708px;
    width: 100%;
    flex-direction: column;
    align-items: center;
    color: var(--M3-sys-light-primary, var(--Schemes-Primary, #65558f));
    text-align: center;
    letter-spacing: var(--Label-Large-Tracking, 0.1px);
    justify-content: start;
    margin: 0 auto;
    padding: 24px 0 189px;
    font: 500 var(--Label-Large-Size, 14px) / var(--Label-Large-Line-Height, 20px) var(--Label-Large-Font, Roboto);
  }
  
  @media (max-width: 991px) {
    .admin-dashboard {
      padding-bottom: 100px;
    }
  }

  .profile-image {
    aspect-ratio: 1.04;
    object-fit: contain;
    object-position: center;
    width: 97px;
  }

  .divider-section {
    transform: rotate(8.742277657347563e-8rad);
    display: flex;
    margin-top: 32px;
    min-height: 39px;
    max-width: 100%;
    width: 364px;
    flex-direction: column;
    color: var(--Schemes-On-Surface-Variant, #49454f);
    white-space: nowrap;
    letter-spacing: var(--Title-Large-Tracking, 0px);
    justify-content: center;
    padding: 0 16px;
    font: 400 var(--Title-Large-Size, 22px) / var(--Title-Large-Line-Height, 28px) var(--Title-Large-Font, Roboto);
  }

  @media (max-width: 991px) {
    .divider-section {
      white-space: initial;
    }
  }

  .divider-line {
    min-height: 1px;
    width: 100%;
    border: 1px solid rgba(202, 196, 208, 1);
  }

  .section-title {
    align-self: center;
    margin-top: 4px;
  }

  .logout-chip {
    border-radius: 8px;
    display: flex;
    margin-top: 32px;
    min-height: 38px;
    width: 150px;
    align-items: center;
    overflow: hidden;
    color: var(--Schemes-On-Surface, #1d1b20);
    justify-content: center;
    border: 1px solid rgba(121, 116, 126, 1);
  }

  .chip-content {
    align-self: stretch;
    min-height: 32px;
    gap: 8px;
    margin: auto 0;
    padding: 6px 16px;
  }

.action-button {
  min-width: 80px;
  justify-content: center;
  border-radius: 16px;
  background: white;
  color: var(--Schemes-On-Surface, #1d1b20);
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  margin-top: 16px;
  min-height: 39px;
  width: 323px;
  max-width: 100%;
  flex-direction: column;
  overflow: hidden;
  transition: background 0.3s, color 0.3s;
}

.action-button:hover {
  background: rgba(202, 196, 208, 0.3);
}
  .action-button.active {
  background: var(--Schemes-Primary, #65558f);
  color: white;
  border: 2px solid var(--Schemes-Primary, #65558f);
}
  .button-content {
    align-self: stretch;
    width: 100%;
    gap: 12px;
    flex: 1;
    height: 100%;
    padding: 16px 20px 16px 16px;
  }
`;
