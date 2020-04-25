package fr.omatech.ordernow.service;

import fr.omatech.ordernow.service.dto.FormulaOrderDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link fr.omatech.ordernow.domain.FormulaOrder}.
 */
public interface FormulaOrderService {

    /**
     * Save a formulaOrder.
     *
     * @param formulaOrderDTO the entity to save.
     * @return the persisted entity.
     */
    FormulaOrderDTO save(FormulaOrderDTO formulaOrderDTO);

    /**
     * Get all the formulaOrders.
     *
     * @return the list of entities.
     */
    List<FormulaOrderDTO> findAll();

    /**
     * Get all the formulaOrders with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<FormulaOrderDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" formulaOrder.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FormulaOrderDTO> findOne(Long id);

    /**
     * Delete the "id" formulaOrder.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
