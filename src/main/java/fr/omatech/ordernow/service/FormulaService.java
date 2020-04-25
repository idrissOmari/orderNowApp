package fr.omatech.ordernow.service;

import fr.omatech.ordernow.service.dto.FormulaDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link fr.omatech.ordernow.domain.Formula}.
 */
public interface FormulaService {

    /**
     * Save a formula.
     *
     * @param formulaDTO the entity to save.
     * @return the persisted entity.
     */
    FormulaDTO save(FormulaDTO formulaDTO);

    /**
     * Get all the formulas.
     *
     * @return the list of entities.
     */
    List<FormulaDTO> findAll();

    /**
     * Get the "id" formula.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FormulaDTO> findOne(Long id);

    /**
     * Delete the "id" formula.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
